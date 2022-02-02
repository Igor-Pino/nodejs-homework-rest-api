const {Schema, model} = require('mongoose');
const Joi = require("joi");
const bcrypt = require('bcrypt');

  const userSchema = Schema ({
    
    password: {
        type: String,
        required: [true, 'Password is required'],
      },
      email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
      },
      subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
      },
      token: {
        type: String,
        default: null,
      }, 

}, {versionKey: false, timestamps: true})

const joiSchema = Joi.object({
    password: Joi.string()
    .min(6)
    .max(20)
    .required(),
    email: Joi.string()
    .email({ minDomainSegments: 2})
    .required(),  
    subscription: Joi.string()
    .valid ("starter", "pro", "business")
    .default("starter")
  })

const subscriptionJoiSchema = Joi.object({
    subscription: Joi.string()
    .valid ("starter", "pro", "business")
    .required(),
    
})

userSchema.methods.comparePasswords = function (password) {
  return bcrypt.compareSync(password, this.password)
}

const User = model("user", userSchema);


module.exports = {
    User,
    joiSchema,
    subscriptionJoiSchema
}