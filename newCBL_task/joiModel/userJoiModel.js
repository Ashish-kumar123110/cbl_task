let Joi = require("joi");


exports.userSignUp = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().required(),
  phone_number: Joi.string().optional()

});

exports.userLogin = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
  });

  exports.addBookings = Joi.object({
    fillingtype: Joi.string().required(),
    pump_id: Joi.string().trim().min(10).optional(),
    vehicles: Joi.string().required()
  
  });

