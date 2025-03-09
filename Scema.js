const Joi = require("joi");

const listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),  
        price: Joi.number().required().min(0),
        country: Joi.string().required(),
        location: Joi.string().required(),
        image: Joi.object({
            filename: Joi.string(),
            url: Joi.string().allow("",null)
        }).required()
    }).required()
});
module.exports = listingSchema;  