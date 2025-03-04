const Joi = require('joi');


module.exports.listingSchema = Joi.object({
    listing : Joi.object({
        title: Joi.string().required(),
        descreption: Joi.string().required(),
        country: Joi.string().required(),
        location: Joi.string().required(),
        price:Joi.number().required().min(0),
        
    }).required()
})
