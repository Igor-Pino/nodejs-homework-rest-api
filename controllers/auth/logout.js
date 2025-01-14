const {User} = require('../../models');

const logout = async (req, res, next) => {
    try {
        
        const{_id}= req.user;
        await User.findByIdAndUpdate(_id, {token: ""})
        res.status(204).send()
    
    } catch (error) {
        next(error)
    }
}

module.exports = logout;