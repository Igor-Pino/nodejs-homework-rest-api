const Joi = require("joi");

const contactsSchema = Joi.object({
    name: Joi.string()
    .min(3)
    .max(30)
    .required(),
    phone: Joi.string()
    .min(10)
    .max(20)
    .required(), 
    email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] }})
    .required(),  
  })

module.exports = contactsSchema;