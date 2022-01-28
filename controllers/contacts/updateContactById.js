const createError = require("http-errors");

const contacts = require('../../models/contacts');
const {contactsSchema} = require('../../schemas');

const updateContactById = async(req, res, next)=> {
    try {
        const {error} = contactsSchema.validate(req.body)
        if(error) {
          throw new createError(400, error.message)
        }
         const {id} = req.params;
         const {name, phone, email} = req.body;
         const result = await contacts.updateContact(id, name, phone, email)
         if(!result) {
          throw new createError (404, "not found contact")      
        }
        res.json(result); 
    } catch (error) {
        next(error)
    }
}

module.exports = updateContactById;