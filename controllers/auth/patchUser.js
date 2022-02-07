const createError = require('http-errors');
const ObjectId = require('mongoose').Types.ObjectId;


const {User} = require('../../models');
const {subscriptionJoiSchema} = require('../../models/users');





const patchUser = async (req, res, next) => {
    try {
        const {error} = subscriptionJoiSchema.validate(req.body);
        if(error){
            throw new createError(400, error.message)
        }
        const {id} = req.params;
        if (!ObjectId.isValid(id)) {
            throw new createError (404, "Invalid id");
          }
        
        const{subscription} = req.body;
        const user = await User.findByIdAndUpdate(id, {subscription}, {new: true})
        if(!user) {
            throw new createError (404, "user not found")
        }
        res.json( {
            user: {
            "email": user.email,
            "subscription": user.subscription
            }
        
});
        
        } catch (error) {
        
        next(error);
    }
}

module.exports = patchUser;