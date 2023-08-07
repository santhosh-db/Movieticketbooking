const Joi = require("joi");
const {USER_TYPE, OPTIONS}=require('../constants');
const {response} = require("../middleware")
const schemas = {
  createMovie :Joi.object({
    title	: Joi.string().required(),
    director: Joi.string().required(),
    releaseDate: Joi.date().required(),
    language: Joi.string().required(),
    duration: Joi.string().regex(/^([0-9]{2}):([0-5][0-9])$/).message("Invalid Duration").required(),
  }),
  scheduleMovie:Joi.object({
    movie_id 	: Joi.number().required(),
    screen_id : Joi.number().required(),
    show_date: Joi.date().required(),
    startTime: Joi.string().regex(/^([0-9]{2}):([0-5][0-9])$/).message("Invalid StartTime").required(),
    intervalTime:Joi.string().regex(/^([0-9]{2}):([0-5][0-9])$/).message("Invalid IntervalDuration").required()
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
  createMovie: (req, res, next) => {
    validate(schemas.createMovie, OPTIONS.basic, req, req.body, res, next);
  },
  scheduleMovie: (req, res, next) => {
    validate(schemas.scheduleMovie, OPTIONS.basic, req, req.body, res, next);
  },
}