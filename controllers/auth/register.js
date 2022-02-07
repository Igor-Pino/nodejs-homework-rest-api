const createError = require('http-errors');
const {Conflict} = require('http-errors');
const {User} = require('../../models');

const {joiSchema} = require('../../models/users');

const bcrypt = require('bcrypt');

const register = async (req, res, next) => {
    try {
        const {error} = joiSchema.validate(req.body);
        if(error){
            throw new createError(400, error.message)
        }
        const {email, password} = req.body;
        const userCheck = await User.findOne({email});
        if(userCheck) {
            throw new Conflict ('it is exist')
        }
        const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        const user = await User.create({email, password: hashPassword}); 
        
        res.status(201).json({
            user:{
                "email": email,
                "subscription": user.subscription
            }

        })
    
    } catch (error) {
        
        next(error);
    }
}

module.exports = register;

