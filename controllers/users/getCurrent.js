const {User} = require('../../models');

const getCurrent = async (req, res, next) => {
    try {
        console.log(req.user)
        res.json({
            "email": req.user.email,
            "subscription": req.user.subscription
        })
    
    } catch (error) {
        next(error)
    }
}

module.exports = getCurrent;
