const createError = require('http-errors');

const contacts = require('../../models/contacts');
const {contactsSchema} = require('../../schemas');

const addContact = async(req, res, next)=> {
    try {
        const {error} = contactsSchema.validate(req.body);
        if(error){
            throw new createError(400, error.message)
        }
        const {name, phone, email} = req.body;
        const newContact = await contacts.addContact(name, phone, email); 
        res.status(201).json(newContact);
    } catch (error) {
        next(error);
    }
}

module.exports = addContact;