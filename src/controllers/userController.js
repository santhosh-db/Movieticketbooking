
const {userService}=require('../services');
const { response } = require("../middleware");

class UserController { }
UserController.movieList = async(req,res,next)=>{
    try
    {
        const result = await  userService.movieList(req.params,req.query);
        return response.success(
            req,
            res,
            result?.code || statusCodes.HTTP_OK,
            result?.data,
            result?.message
          );
    }
    catch(error){
        console.log("err", error);
        next(error);
    }
}

UserController.ticketBook = async(req,res,next)=>{
    try
    {
        const result = await userService.ticketBook(req.body, req.user.id);
        return response.success(
            req,
            res,
            result?.code || statusCodes.HTTP_OK,
            result?.data,
            result?.message
          );
    }
    catch(error){
        console.log("err", error);
        next(error);
    }
}


UserController.ticketCancel = async(req,res)=>{
    try
    {
        const result = await  userService.ticketCancel(req.params.id);
        return response.success(
            req,
            res,
            result?.code || statusCodes.HTTP_OK,
            result?.data,
            result?.message
          );
    }catch(error){
        console.log("err", error);
        next(error);
    }
}

UserController.seatAvailabilityList=async(req,res)=>{
    try
    {
        const result = await  userService.seatAvailabilityList(req.query);
        return response.success(
            req,
            res,
            result?.code || statusCodes.HTTP_OK,
            result?.data,
            result?.message
          );
    }catch(error){
        console.log("err", error);
        next(error);
    }
}

UserController.bookingHistory=async(req,res)=>{
    try
    {
        const result = await  userService.bookingHistory(req.user.id,req.query);
        return response.success(
            req,
            res,
            result?.code || statusCodes.HTTP_OK,
            result?.data,
            result?.message
          );
    }catch(error){
        console.log("err", error);
        next(error);
    }
}

UserController.findbyId= async(req,res)=>{
    try
    {
        const result = await  userService.findbyId(req.params.id);
        return response.success(
            req,
            res,
            result?.code || statusCodes.HTTP_OK,
            result?.data,
            result?.message
          );
    }catch(error){
        console.log("err", error);
        next(error);
    }
}
module.exports=UserController;