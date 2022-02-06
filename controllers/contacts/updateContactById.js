const createError = require("http-errors");
const ObjectId = require('mongoose').Types.ObjectId;

const {Contact} = require('../../models');

const {joiSchema} = require('../../models/contact')

const updateContactById = async(req, res, next)=> {
  try {
      const {error} = joiSchema.validate(req.body)
      if(error) {
        throw new createError(400, error.message)
      }
       const {id} = req.params;
       if (!ObjectId.isValid(id)) {
        throw new createError (404, "Invalid id");
      }
       const {_id} = req.user
       const result = await Contact.findOneAndUpdate({owner:_id, _id: id}, req.body, {new: true})
       if(!result) {
        throw new createError (404, "not found contact")      
      }
      res.json(result); 
  } catch (error) {
      next(error)
  }
}

module.exports = updateContactById;