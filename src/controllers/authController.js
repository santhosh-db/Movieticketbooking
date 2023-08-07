
const {authService}=require('../services');
const { response } = require("../middleware");
const { statusCodes } = require('../config');

class AuthController { }
AuthController.register = async(req,res,next)=>{
    try
    {
        const result = await  authService.createUser(req.body);
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

AuthController.login = async(req,res)=>{
    try
    {
        const result = await  authService.signInUser(req.body);
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

module.exports=AuthController;