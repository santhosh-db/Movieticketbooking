const Joi = require("joi");
const {USER_TYPE, OPTIONS}=require('../constants');
const {response} = require("../middleware")
const schemas = {
  movieValid :Joi.object({
    date: Joi.date().required(),
  }),
  ticketBook:Joi.object({
    date: Joi.date().required(),
    schedule_id: Joi.number().required(),
    totalSeats: Joi.number().required(),
    seats: Joi.array().required(),
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
  movieValid: (req, res, next) => {
    validate(schemas.movieValid, OPTIONS.basic, req, req.params, res, next);
  },
  ticketBook: (req, res, next) => {
    validate(schemas.ticketBook, OPTIONS.basic, req, req.body, res, next);
  },
}