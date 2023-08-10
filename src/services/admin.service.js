const Movie =require("../models/Movie");
const Schedule= require("../models/Schedule");
const Screen= require("../models/Screen");
const { Op } = require("sequelize");
const { statusCodes, messages } = require("../config");
const moment=require('moment');
const Ticket = require("../models/Ticket");
const { STATUS } = require("../constants");
const {errorObjGeneator}=require("../middleware/response");

class AdminService {}

AdminService.createMovie = async(payLoad)=>{
    try
    {
        //create movie
        const data = await  Movie.create(payLoad)
        return {
            code: statusCodes.HTTP_OK,
            message: messages.movieCreated,
            data
        };
    }
    catch(err){
        return errorObjGeneator(err);
    }
}
AdminService.scheduleMovie = async(payLoad,id)=>{
    try
    {
        //check movie is released
        let findMovie = await  Movie.findByPk(payLoad.movie_id);
        let showDate=moment(payLoad.show_date).format("YYYY-MM-DD");
        let releaseDate =moment(findMovie.releaseDate).format("YYYY-MM-DD");
        if(showDate<releaseDate){
            return {
                code: statusCodes.HTTP_BAD_REQUEST,
                message: messages.movieNotReleased
            };
        }
        //check screen is available
        let findScreen = await  Screen.findByPk(payLoad.screen_id);
        if(!findScreen){
            return {
                code: statusCodes.HTTP_BAD_REQUEST,
                message: messages.noScreen
            };
        }
        //scheduleMismatch
        let scheduleMismatch= await  Schedule.findAll({
            where:{
                screen_id:payLoad.screen_id,
                show_date:payLoad.show_date,
            }
        });
        let misMatch=scheduleMismatch.filter(i =>i.endTime>payLoad.startTime)
        if(misMatch.length>0){
            return {
                code: statusCodes.HTTP_BAD_REQUEST,
                message: messages.scheduleMismatch
            };
        }

        //find movie End Time
        const startTime = moment(payLoad.startTime, 'HH:mm:ss');
        const intervalTime = moment.duration(payLoad.intervalTime);
        const duration = moment.duration(findMovie.duration);
        const endTime = moment(startTime).add(duration).add(intervalTime);
        payLoad.endTime = endTime.format('HH:mm:ss');
        payLoad.scheduled_by=id;

        //Schedule data insertion
        const data = await  Schedule.create(payLoad)
        return {
            code: statusCodes.HTTP_OK,
            message: messages.movieCreated,
            data
        };
    }
    catch(err){
        return errorObjGeneator(err);
    }
}

AdminService.changeScreen= async(payLoad)=>{
    try
    {
        //check any ticket booking is done
        let checkBooking = await  Ticket.findOne({
                where:{
                    schedule_id: payLoad.scheduleId,
                    status:STATUS.ACTIVE
                }
        });
        if(checkBooking){
            return {
                code: statusCodes.HTTP_BAD_REQUEST,
                message: messages.userBooked
            };
        }

        //Schedule updation
        const data = await  Schedule.update({screen_id:payLoad.screen_id},{
            where:{
                id: payLoad.scheduleId
            }
        })
        return {
            code: statusCodes.HTTP_OK,
            message: messages.screenUpdation,
            data
        };
    }
    catch(err){
        return errorObjGeneator(err);
    }
}
module.exports=AdminService;