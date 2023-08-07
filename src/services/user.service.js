const User =require("../models/User");
const Movie = require("../models/Movie");
const Screen = require("../models/Screen");
const Ticket = require("../models/Ticket");
const Schedule = require("../models/Schedule");
const { Op } = require("sequelize");
const { statusCodes, messages } = require("../config");
const { pagingData } = require("../utils");
const { USER_TYPE,STATUS } = require("../constants");


class UserService { }
UserService.movieList = async(params,query)=>{
    try
    {
        let page= query.page || 1;
        let size= query.size || 5;
        const count = await Schedule.count({
            where:{
                show_date:params.date,
                status:STATUS.ACTIVE
            }
        });
        const data= await Schedule.findAll({
            where:{
                show_date:params.date,
                status:STATUS.ACTIVE
            },
            include: [
              {
                model: Screen,
                attributes: ['id', 'name'], // Specify the attributes you want to include from the Screen model
                where: {
                    status:STATUS.ACTIVE
                }
              },
              {
                model: Movie,
                attributes: ['id', 'title'], // Specify the attributes you want to include from the Schedule model
                where: {
                    status:STATUS.ACTIVE
                },
              },
            ],
          });
        let result =  pagingData(data,page,size,count);

        return {
            code: statusCodes.HTTP_OK,
            message: messages.movieList,
            data:result
        };
    }
    catch(err){
        throw new Error(err)
    }
}

UserService.ticketBook = async(payLoad,id)=>{
    try
    {
        //check seats mismatch
        for (let index = 0; index < payLoad.seats.length; index++) {
            const element = payLoad.seats[index].toString();
            let checkSeats = await Ticket.findOne({
                where:{
                    seats:{[Op.substring]: element}
                }
            });
            if(checkSeats){
                return {
                    code: statusCodes.HTTP_BAD_REQUEST,
                    message: element + messages.seatAlreadyBooked
                };
            }
        }
        //book ticket
        let body={
            schedule_id:payLoad.schedule_id,
            user_id:id,
            bookingOn:payLoad.date,
            totalSeats:payLoad.totalSeats,
            seats:payLoad.seats.join(","),
            totalCost:(payLoad.totalSeats*150)
        }
        const data = await  Ticket.create(body)
        return {
            code: statusCodes.HTTP_OK,
            message: messages.ticketBook,
            data
        };
    }
    catch(err){
        throw new Error(err)
    }
}

UserService.ticketCancel = async(payLoad)=>{
    try
    {
        let data=await Ticket.update({status:STATUS.INACTIVE},{
            where:{
                id: payLoad
            }
        })
        return {
            code: statusCodes.HTTP_OK,
            message: messages.ticketCancel,
            data
        };
    }
    catch(err){
        throw new Error(err)
    }
}
UserService.findbyId = async(payLoad)=>{
    try
    {
        let data=await  User.findOne({
            where:{
                id: payLoad
            }
        })
        return {
            code: statusCodes.HTTP_OK,
            message: messages.userListed,
            data
        };
    }
    catch(err){
        throw new Error(err)
    }
}


module.exports=UserService;