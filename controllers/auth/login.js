const createError = require('http-errors');
const {Unauthorized} = require('http-errors');
const {User} = require('../../models');
const {joiSchema} = require('../../models/user');

const jwt = require('jsonwebtoken');
const {SECRET_KEY} = process.env;

const login = async (req, res, next) => {
   
    try {
        const {error} = joiSchema.validate(req.body);
        
        if(error){
            throw new createError(400, error.message)
        }
    
       const {email, password} = req.body;
       const user = await User.findOne({email})
       if(!user || !user.comparePasswords(password)) {
        throw new Unauthorized ('Email or password is wrong')
       }
       else {
        const payload = {id: user.id};
        const token = jwt.sign(payload, SECRET_KEY, {expiresIn: '1h'});
        
        res.status(200).json({
            token: token,
            user: {
                email                            
              }
        })      

        }}
        
    
     catch (error) {
        
        next(error)
       
    }
}


module.exports = login;