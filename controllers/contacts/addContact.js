const createError = require('http-errors');

const {Contact} = require('../../models');

const {joiSchema} = require('../../models/contactDB');

const addContact = async(req, res, next)=> {
    try {
        const {error} = joiSchema.validate(req.body);
        if(error){
            throw new createError(400, error.message)
        }
        const {name, phone, email} = req.body;
        const newContact = await Contact.create({name, phone, email}); 
        res.status(201).json(newContact);
    } catch (error) {
        next(error);
    }
}

module.exports = addContact;