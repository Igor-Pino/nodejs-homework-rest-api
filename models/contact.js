const {Schema, model} = require('mongoose');
const Joi = require("joi");

const contactSchema = Schema ({
    
        name: {
          type: String,
          required: [true, 'Set name for contact'],
        },
        email: {
          type: String,
        },
        phone: {
          type: String,
        },
        favorite: {
          type: Boolean,
          default: false,
        },
      

}, {versionKey: false, timestamps: true})

const joiSchema = Joi.object({
    name: Joi.string()
    .min(3)
    .max(30)
    .required(),
    phone: Joi.string()
    .min(10)
    .max(20)
    .required(), 
    email: Joi.string()
    .email({ minDomainSegments: 2})
    .required(),  
    favorite: Joi.bool()
  })

const favoriteJoiSchema = Joi.object({
  favorite: Joi.bool()
  .required(),
})

const Contact = model("contacts", contactSchema);

module.exports = {
    Contact,
    joiSchema,
    favoriteJoiSchema
}