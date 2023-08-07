
const {superAdminService}=require('../services');
const { response } = require("../middleware");

class superAdminController { }

superAdminController.createTheatre = async(req,res,next)=>{
    try
    {
        const result = await  superAdminService.createTheatre(req.body,req.user.id);
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

superAdminController.createScreen = async(req,res,next)=>{
    try
    {
        const result = await  superAdminService.createScreen(req.body,req.user.id);
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

superAdminController.createAdmin = async(req,res,next)=>{
    try
    {
        const result = await  superAdminService.createAdmin(req.body);
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



module.exports=superAdminController;