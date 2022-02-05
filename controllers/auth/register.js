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
        const {email, password, subscription='starter'} = req.body;
        const user = await User.findOne({email});
        if(user) {
            throw new Conflict ('it is exist')
        }
        else {
            const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
            const result = await User.create({email, password: hashPassword, subscription}); 
        res.status(201).json({
            user: {
                email,
                subscription 
                         
              }

        })
    };
    } catch (error) {
        
        next(error);
    }
}

module.exports = register;

