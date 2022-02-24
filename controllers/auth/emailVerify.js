const createError = require('http-errors');
const {User} = require('../../models');

const emailVerify = async (req, res, next) => {
    try {
        const {verificationToken} = req.params;
        
        const user = await User.findOne({verificationToken});
        if(!user) {
            throw new createError(404, 'User not Found')
        }
        await User.findByIdAndUpdate(user._id, {verify: true, verificationToken:""})
        res.json({
            message: 'Verification successful'

        })

    } catch (error) {
        next(error)
    }
}

module.exports = emailVerify;