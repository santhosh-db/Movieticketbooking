const Theatre = require('../models/Theatre');
const Screen = require("../models/Screen");
const User = require('../models/User');
const { Op } = require("sequelize");
const { statusCodes, messages } = require("../config");
const {bcrypt} = require("../utils");
class superAdminService { }

superAdminService.createTheatre = async(payLoad,id)=>{
    try
    {
        //create theatre
        const data = await  Theatre.create({...payLoad,created_by:id})
        return {
            code: statusCodes.HTTP_OK,
            message: messages.theatreCreated,
            data
        };
    }
    catch(err){
        throw new Error(err)
    }
}

superAdminService.createScreen = async(payLoad,id)=>{
    try
    {
        //create screen
        const data = await  Screen.create({...payLoad,capacity:(payLoad.rows*payLoad.columns),created_by:id})
        return {
            code: statusCodes.HTTP_OK,
            message: messages.screenCreated,
            data
        };
    }
    catch(err){
        throw new Error(err)
    }
}

superAdminService.createAdmin = async(payLoad)=>{
    try
    { 
        //check existing Admin with same email
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
        //created hashed Password 
        let hashPassword = await bcrypt.createPasswordHash(payLoad.password);
        //create admin 
        const data = await  User.create({...payLoad,password:hashPassword})
        return {
            code: statusCodes.HTTP_OK,
            message: messages.adminCreated,
            data
        };
    }
    catch(err){
        throw new Error(err)
    }
}

module.exports=superAdminService;