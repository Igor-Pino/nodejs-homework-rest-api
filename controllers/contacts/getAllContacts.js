const createError = require('http-errors');
const {Contact} = require('../../models');

const getAllContacts = async(req, res, next)=> {
  try {
    const {page = 1, limit = 10, favorite = false} = req.query;
    if(isNaN(page) || isNaN(limit)) {
      throw new createError (400, "bad request")
    }
    const skip = (page - 1) * limit;
    const {_id} = req.user
    const result = await Contact.find({owner: _id, favorite},"-createdAt -updatedAt",{skip, limit: +limit}).populate("owner", "email");
    res.json({
      status: "success",
      code: 200,
      data: {
        result
      }
      });  
    
  } catch (error) {
    next(error)
  }

        
} 

module.exports = getAllContacts;