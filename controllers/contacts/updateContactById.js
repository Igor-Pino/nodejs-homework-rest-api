const createError = require("http-errors");

const {Contact} = require('../../models');


const {joiSchema} = require('../../models/contact')

const updateContactById = async(req, res, next)=> {
  try {
      const {error} = joiSchema.validate(req.body)
      if(error) {
        throw new createError(400, error.message)
      }
       const {id} = req.params;
       
       const result = await Contact.findByIdAndUpdate(id, req.body, {new: true})
       if(!result) {
        throw new createError (404, "not found contact")      
      }
      res.json(result); 
  } catch (error) {
      next(error)
  }
}

module.exports = updateContactById;