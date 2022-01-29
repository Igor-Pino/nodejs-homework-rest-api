const createError = require('http-errors');

const {Contact} = require('../../models');

const {joiSchema} = require('../../models/contact');

const addContact = async(req, res, next)=> {
    try {
        const {error} = joiSchema.validate(req.body);
        if(error){
            throw new createError(400, error.message)
        }
        const newContact = await Contact.create(req.body); 
        res.status(201).json(newContact);
    } catch (error) {
        if(error.message.includes('validation failed')){
            error.status = 400;
        }
        next(error);
    }
}

module.exports = addContact;