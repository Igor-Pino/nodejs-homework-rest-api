const {Contact} = require('../../models');

const getAllContacts = async(req, res, next)=> {
  try {
    const {page = 1, limit = 10} = req.query;
    const skip = (page - 1) * limit;
    const {_id} = req.user
    const result = await Contact.find({owner: _id},"-createdAt -updatedAt",{skip, limit: +limit}).populate("owner", "email");
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