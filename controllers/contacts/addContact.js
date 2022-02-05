const createError = require('http-errors');

const {Contact} = require('../../models');

const {joiSchema} = require('../../models/contact');

const addContact = async(req, res, next)=> {
    try {
        const {error} = joiSchema.validate(req.body);
        if(error){
            throw new createError(400, error.message)
        }
        const data = {...req.body, owner: req.user._id}
        const newContact = await Contact.create(data); 
        res.status(201).json(newContact);
    } catch (error) {
        
        next(error);
    }
}

module.exports = addContact;