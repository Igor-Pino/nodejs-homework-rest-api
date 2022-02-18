const createError = require('http-errors');
const {User} = require('../../models');
const {emailVerifySchema} = require ('../../models/users')
const {sendMail} = require ('../../helpers')

const emailReValidation = async (req, res, next) => {
    try {
        const {error} = emailVerifySchema.validate(req.body);
        if(error){
            throw new createError (400, 'missing required field email')
        }
        
        const{email} = req.body

        const user = await User.findOne({email});  
        if(user.verify) {
            throw new createError (400, 'email already verified')
        }     
       
        const mail = {
            to: email,
            subject: "new email verification",
            html: `<td align="center"><table width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center"><tbody><tr><td align="left"><table width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td width="530" valign="top" align="center"><table width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td  align="center" style="font-size:0"><p><img src="https://tlr.stripocdn.email/content/guids/CABINET_75694a6fc3c4633b3ee8e3c750851c02/images/67611522142640957.png" alt style="display: block;" width="120"></p></td></tr><tr><td  align="center"><h2>You sing up success!</h2></td></tr><tr><td  align="center"><p style="font-size: 16px; color: #777777;"><a target="_blank" href="http://localhost:3000/api/users/verify/${user.verificationToken}">Press to approve your mail</a></p></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td>`

        }
        await sendMail(mail)





       
        res.json({
            message: 'Verification email sent'

        })

    } catch (error) {
        next(error)
    }
}

module.exports = emailReValidation;