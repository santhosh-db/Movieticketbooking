const User = require('../models/User');
const { generateToken } = require('../middleware/generateToken');
const {bcrypt} = require("../utils");
const { Op } = require("sequelize");
const { statusCodes, messages } = require("../config");

class AuthService { }
AuthService.createUser = async(payLoad)=>{
    try
    {
        //check existing User with same email
        let findUser=await User.findOne({
            where:{
                email: payLoad.email
            }
        });
        if(findUser){
            return {
                code: statusCodes.HTTP_BAD_REQUEST,
                message: messages.registeredUser
            };
        } 
        //hash password
        let hashPassword = await bcrypt.createPasswordHash(payLoad.password);
        //create User
        let response=await User.create({...payLoad,password:hashPassword});
        return {
            code: statusCodes.HTTP_OK,
            message: messages.userCreated,
            data:response
        };
    }
    catch(err){
        throw new Error(err)
    }
}
AuthService.signInUser = async(data)=>{
    try
    {
        //check existing User
        let findUser=await User.findOne({
            where:{
                email: data.email
            }
        });
        if(!findUser){
            return {
                code: statusCodes.HTTP_UNAUTHORIZED,
                message: messages.invalidUser
            };
        } 
        //compare password input with hashed password
        let comparePassword = await bcrypt.comparePassword(data.password,findUser.password);
        
        if(!comparePassword){
            return {
                code: statusCodes.HTTP_UNAUTHORIZED,
                message: messages.invalidPassword
            };
        } 
        //generate Token
        let tokenData={ id: findUser.id ,email:findUser.email,role:findUser.role};
        let response=await generateToken(tokenData);
        return {
            code: statusCodes.HTTP_OK,
            message: messages.loginSuccess,
            data:{token:response}
        };
    }
    catch(err){
        throw new Error(err)
    }
}

module.exports=AuthService;