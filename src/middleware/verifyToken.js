const jwt=require('jsonwebtoken')
const response = require("../middleware/response");
const { statusCodes, messages } = require("../config");

const verifyToken=(req,res,next)=>{
    try{
        //invalid headers
        if(!req.headers.authorization){
            return response.errors(
                req,
                res,
                statusCodes.HTTP_UNAUTHORIZED,
                messages.invalidToken,
                null
            )
        }
        //split Bearer
        const token=req.headers.authorization.split(' ')[1];
        //verify JWT
        const decode=jwt.verify(token,process.env.JWT_SECRET_KEY);
        //assign decode data
        req.user=decode;
        next();
    }
    catch(error)
    {
        console.log("err",error);
        next(error)
    }
}

module.exports={verifyToken}