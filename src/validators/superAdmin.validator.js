const Joi = require("joi");
const {USER_TYPE, OPTIONS}=require('../constants');
const {response} = require("../middleware")
const schemas = {
  createTheatre :Joi.object({
      name: Joi.string().required(),
      location: Joi.string().required()
  }),
  createScreen : Joi.object({
    name: Joi.string().required(),
    rows: Joi.number().required(),
    columns: Joi.number().required(),
    theatre_id: Joi.number().required()
  }),
  createAdmin:Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().message("Invalid email").required(),
    location: Joi.string().required(),
    phone: Joi.string().regex(/^[0-9]{10}$/).message("Should contain 10 numbers").required(),
    password: Joi.string().regex(/^[a-zA-Z0-9[#?!@$%^&*-]{8,16}$/).message("Should contain small,caps,numbers,special chars of len 8-16").required(),
    role: Joi.string().valid(USER_TYPE.ADMIN).required(),
  }),
}

const validate = async(schema, option, req, data, res, next) => {
  await schema.validateAsync(data,option).then(() => {
    next();
  }).catch((err) => { 
    return response.joicustomerrors(req, res, err);
  });
}

module.exports = {
  createTheatre: (req, res, next) => {
    validate(schemas.createTheatre, OPTIONS.basic, req, req.body, res, next);
  },
  createScreen: (req, res, next) => {
    validate(schemas.createScreen, OPTIONS.basic, req, req.body, res, next);
  },
  createAdmin: (req, res, next) => {
    validate(schemas.createAdmin, OPTIONS.basic, req, req.body, res, next);
  },
}