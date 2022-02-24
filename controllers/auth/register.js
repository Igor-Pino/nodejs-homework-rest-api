const createError = require('http-errors');
const {Conflict} = require('http-errors');
const {User} = require('../../models');
const {joiSchema} = require('../../models/users');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const {v4} = require('uuid');
const {sendMail} = require ('../../helpers')

const register = async (req, res, next) => {
    try {
        const {error} = joiSchema.validate(req.body);
        if(error){
            throw new createError(400, error.message)
        }
        const {email, password} = req.body;
        const userCheck = await User.findOne({email});
        if(userCheck) {
            throw new Conflict ('user allready exist')
        }
        const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

        const avatarURL = gravatar.url(email, {protocol: true});

        const verificationToken = v4()

        const user = await User.create({email, avatarURL, password: hashPassword, verificationToken}); 

        const mail = {
            to: email,
            subject: "new email verification",
            html: `<td align="center"><table width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center"><tbody><tr><td align="left"><table width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td width="530" valign="top" align="center"><table width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td  align="center" style="font-size:0"><p><img src="https://tlr.stripocdn.email/content/guids/CABINET_75694a6fc3c4633b3ee8e3c750851c02/images/67611522142640957.png" alt style="display: block;" width="120"></p></td></tr><tr><td  align="center"><h2>You sing up success!</h2></td></tr><tr><td  align="center"><p style="font-size: 16px; color: #777777;"><a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Press to approve your mail</a></p></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td>`

        }
        await sendMail(mail)
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

