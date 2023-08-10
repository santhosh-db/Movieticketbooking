
const {adminService}=require('../services');
const { response } = require("../middleware");

class AdminController { }
AdminController.createMovie = async(req,res,next)=>{
    try
    {
        const result = await  adminService.createMovie(req.body);
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

AdminController.scheduleMovie = async(req,res,next)=>{
    try
    {
        const result = await  adminService.scheduleMovie(req.body,req.user.id);
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

AdminController.changeScreen = async(req,res,next)=>{
    try
    {
        const result = await  adminService.changeScreen(req.body);
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
module.exports=AdminController;