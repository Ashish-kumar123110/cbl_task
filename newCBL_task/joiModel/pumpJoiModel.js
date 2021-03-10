let Joi = require("joi");

exports.addPumpDetails = Joi.object({
    name: Joi.string().required(),
  city: Joi.string().required(),
  phone_number: Joi.string().optional(),
  location:Joi.array().items(Joi.number()),
      feultype:Joi.array().items()
  })

  exports.personDetails = Joi.object({
    name: Joi.string().required(),
    phone_number: Joi.string().optional(),
    pump_id:Joi.string().trim().min(10).required() 
  })

  exports.updateBooking = Joi.object({
    pumpId: Joi.string().trim().min(10).optional() ,
    person_id: Joi.string().trim().min(10).optional() ,
    status:Joi.string().optional() 
  })

  exports.showBookingDetails = Joi.object({
    pumpId: Joi.string().trim().min(10).optional() 
  })




