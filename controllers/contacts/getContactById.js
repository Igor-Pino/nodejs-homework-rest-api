
const createError = require("http-errors");

const ObjectId = require('mongoose').Types.ObjectId;

const {Contact} = require('../../models');

const getContactById = async(req, res, next)=> {
  try {
      const {id} = req.params
      if (!ObjectId.isValid(id)) {
        throw new createError (404, "Invalid id");
      }
      const {_id} = req.user
      const result = await Contact.findOne({owner:_id, _id: id}, "-createdAt -updatedAt").populate("owner", "email");
        if(!result) {
          throw new createError (404, "not found contact")      
    }
      res.json(result)
  } catch (error) {

    next(error)
  }
}

module.exports = getContactById;


