
const createError = require("http-errors");
const ObjectId = require('mongoose').Types.ObjectId;
const {Contact} = require('../../models');

const {favoriteJoiSchema} = require('../../models/contact');

const patchContactById = async(req, res, next)=> {
  try {
      const {error} = favoriteJoiSchema.validate(req.body)
      if(error) {
        throw new createError(400, error.message)
      }
       const {id} = req.params;
       if (!ObjectId.isValid(id)) {
        throw new createError (404, "Invalid id");
      }
       const {favorite} = req.body;
       const result = await Contact.findByIdAndUpdate(id, {favorite}, {new: true})
       if(!result) {
        throw new createError (404, "not found contact")      
      }
      res.json(result); 
  } catch (error) {
      next(error)
  }
}


module.exports = patchContactById;