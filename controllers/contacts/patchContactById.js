const createError = require("http-errors");

const {Contact} = require('../../models');

const {favoriteJoiSchema} = require('../../models/contact');

const patchContactById = async(req, res, next)=> {
  try {
      const {error} = favoriteJoiSchema.validate(req.body)
      if(error) {
        throw new createError(400, error.message)
      }
       const {id} = req.params;
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