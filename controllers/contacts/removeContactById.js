const createError = require("http-errors");
const ObjectId = require('mongoose').Types.ObjectId;


const {Contact} = require('../../models');



const removeContactById = async(req, res, next)=> {
    try {
        const {id} = req.params;
        if (!ObjectId.isValid(id)) {
            throw new createError (404, "Invalid id");
        }
        const {_id} = req.user
        const result = await Contact.findOneAndRemove({owner:_id, _id: id});  
        if(!result) {
          throw new createError (404, "not found contact")      
        }
        res.json({message: `contact ${result.name} deleted`})
    } catch (error) {
        next(error);
    }
}

module.exports = removeContactById;