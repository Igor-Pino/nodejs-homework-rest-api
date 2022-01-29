
const createError = require("http-errors");

const {Contact} = require('../../models');

const getContactById = async(req, res, next)=> {
  try {
      const {id} = req.params
      const result = await Contact.findById(id);
        if(!result) {
          throw new createError (404, "not found contact")      
    }
      res.json(result)
  } catch (error) {
    if(error.message.includes('Cast to ObjectId failed')){
      error.status = 404;
  }
      next(error)
  }
}

module.exports = getContactById;