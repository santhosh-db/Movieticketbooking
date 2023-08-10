const User =require("../models/User");
const Movie = require("../models/Movie");
const Screen = require("../models/Screen");
const Ticket = require("../models/Ticket");
const Schedule = require("../models/Schedule");
const { Sequelize,Op } = require("sequelize");
const { statusCodes, messages } = require("../config");
const { pagingData } = require("../utils");
const { STATUS } = require("../constants");
const moment=require('moment');
const {errorObjGeneator}=require("../middleware/response");

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
        return errorObjGeneator(err);
    }
}

UserService.ticketBook = async(payLoad,id)=>{
    try
    {
        //Seats selected are inequal
        if(payLoad.seats.length!=payLoad.totalSeats){
            return {
                code: statusCodes.HTTP_BAD_REQUEST,
                message: messages.seatInequal
            };
        }
        //check seats mismatch
        // for (let index = 0; index < payLoad.seats.length; index++) {
        //     const element = payLoad.seats[index].toString();
        //     let checkSeats = await Ticket.findOne({
        //         where:{
        //             seats:{[Op.substring]: element}
        //         }
        //     });
        //     if(checkSeats){
        //         return {
        //             code: statusCodes.HTTP_BAD_REQUEST,
        //             message: 'Seat no: '+ element + messages.seatAlreadyBooked
        //         };
        //     }
        // }
            console.log(payLoad.seats,"gmsfb");
            let checkSeats = await Ticket.findAll({
                where:{
                    seats:{[Op.like]: `%${payLoad.seats}%`},
                    schedule_id:payLoad.schedule_id
                }
            });
            if(checkSeats.length>0){
                return {
                    code: statusCodes.HTTP_BAD_REQUEST,
                    message: messages.seatAlreadyBooked
                };
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
        return errorObjGeneator(err);
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
        return errorObjGeneator(err);
    }
}

UserService.seatAvailabilityList=async(payLoad)=>{
    try
    {
        const data= await Schedule.findAll({
            attributes:[],
            raw:true,
            nest:true,
            where: {
                status:STATUS.ACTIVE,
                id:payLoad.scheduleId
            },
            include:[
                {
                    model: Screen,
                    attributes: ['capacity'], // Specify the attributes you want to include from the Screen model
                    where: {
                        status:STATUS.ACTIVE
                    }
                },
                {
                    model: Ticket,
                    required:true,
                    attributes: [[Sequelize.fn('SUM', Sequelize.col('totalSeats')), 'bookedTickets']], // Specify the attributes you want to include from the Screen model
                    where: {
                        status:STATUS.ACTIVE
                    }
                }
            ]
        })
        let {screen,tickets}=data[0];
        data[0].pendingSeats=parseInt(screen.capacity)-(tickets.bookedTickets?parseInt(tickets.bookedTickets):0);
        return {
            code: statusCodes.HTTP_OK,
            message: messages.seatAvailability,
            data
        };
    }
    catch(err){
        return errorObjGeneator(err);
    }
}

UserService.bookingHistory=async(payLoad,params)=>{
    try
    {
        let currentDate=moment().format("YYYY-MM-DD");
        let currentTime=moment().format("HH:mm:ss");
        let page= params.page || 1;
        let size= params.size || 5;
        const count = await Schedule.count({
            raw:true,
            nest:true,
            where: {
                [Op.or]: [
                    {
                        [Op.and]:{
                            show_date: 
                            {
                                [Op.eq]: currentDate
                            },
                            startTime: {
                                [Op.gt]: currentTime
                            }
                        }
                    },
                    {
                      show_date: {
                        [Op.gt]: currentDate
                      }
                    }
                ],
                status:STATUS.ACTIVE
            },
            include:[
                {
                    model: Ticket,
                    required:true,
                    where: {
                        status:STATUS.ACTIVE,
                        user_id:payLoad,
                    }
                },
                {
                    model: Movie,
                    where: {
                        status:STATUS.ACTIVE
                    }
                },
            ]
        });
        const data= await Schedule.findAll({
            raw:true,
            nest:true,
            attributes:['show_date','startTime'],
            where: {
                [Op.or]: [
                    {
                        [Op.and]:{
                            show_date: 
                            {
                                [Op.eq]: currentDate
                            },
                            startTime: {
                                [Op.gt]: currentTime
                            }
                        }
                    },
                    {
                      show_date: {
                        [Op.gt]: currentDate
                      }
                    }
                ],
                status:STATUS.ACTIVE
            },
            include:[
                {
                    model: Ticket,
                    attributes:['totalSeats', 'seats','totalCost'],
                    required:true,
                    where: {
                        status:STATUS.ACTIVE,
                        user_id:payLoad,
                    }
                },
                {
                    model: Movie,
                    attributes: ['id', 'title','releaseDate'],
                    where: {
                        status:STATUS.ACTIVE
                    }
                },
            ]
        })
        let result =  pagingData(data,page,size,count);
        return {
            code: statusCodes.HTTP_OK,
            message: messages.ticketBookingHistory,
            data:result
        };
    }
    catch(err){
        return errorObjGeneator(err);
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
        return errorObjGeneator(err);
    }
}


module.exports=UserService;