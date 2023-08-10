const Joi = require("joi");
const {USER_TYPE, OPTIONS}=require('../constants');
const {response} = require("../middleware")
const schemas = {
  signUpSchema :Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().message("Invalid email").required(),
      location: Joi.string().required(),
      phone: Joi.string().regex(/^\d{10}$/).message("Should contain 10 numbers").required(),
      password: Joi.string().regex(/^[a-zA-Z0-9[#?!@$%^&*-]{8,16}$/).message("Should contain small,caps,numbers,special chars of len 8-16").required(),
      role: Joi.string().valid(USER_TYPE.USER).required(),
  }),
  superAdminRegister:Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().message("Invalid email").required(),
    location: Joi.string().required(),
    phone: Joi.string().regex(/^\d{10}$/).message("Should contain 10 numbers").required(),
    password: Joi.string().regex(/^[a-zA-Z0-9[#?!@$%^&*-]{8,16}$/).message("Should contain small,caps,numbers,special chars of len 8-16").required(),
    role: Joi.string().valid(USER_TYPE.SUPERADMIN).required(),
}),
  signInSchema : Joi.object({
        email: Joi.string().required(),
        password: Joi.string().regex(/^[a-zA-Z0-9[#?!@$%^&*-]{8,16}$/).message("Should contain small,caps,numbers,special chars of len 8-16").required(),
    })
}

const validate = async(schema, option, req, data, res, next) => {
  await schema.validateAsync(data,option).then(() => {
    next();
  }).catch((err) => { 
    return response.joicustomerrors(req, res, err);
  });
}

module.exports = {
  signUp: (req, res, next) => {
    validate(schemas.signUpSchema, OPTIONS.basic, req, req.body, res, next);
  },
  superAdminRegister: (req, res, next) => {
    validate(schemas.superAdminRegister, OPTIONS.basic, req, req.body, res, next);
  },
  signIn: (req, res, next) => {
    validate(schemas.signInSchema, OPTIONS.basic, req, req.body, res, next);
  },
}