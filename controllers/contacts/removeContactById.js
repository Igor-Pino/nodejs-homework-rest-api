const contacts = require('../../models/contacts');

const removeContactById = async(req, res, next)=> {
    try {
        const {id} = req.params;
        const result = await contacts.removeContact(id);  
        if(!result) {
          throw new createError (404, "not found contact")      
        }
        res.json({message: `contact ${result.name} deleted`})
    } catch (error) {
        next(error);
    }
}

module.exports = removeContactById;