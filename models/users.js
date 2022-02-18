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
        default: "",
      },
      avatarURL:{        
        type: String,        
      },
      verify: {
        type: Boolean,
        default: false,
      },
      verificationToken: {
        type: String,
        required: [true, 'Verify token is required'],
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

const emailVerifySchema = Joi.object({
  email: Joi.string()
  .email({ minDomainSegments: 2})
  .required(), 
  
})

userSchema.methods.comparePasswords = function (password) {
  return bcrypt.compareSync(password, this.password)
}

const User = model("user", userSchema);


module.exports = {
    User,
    joiSchema,
    subscriptionJoiSchema,
    emailVerifySchema
}