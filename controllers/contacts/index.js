const getAllContacts = require("./getAllContacts");
const getContactById = require("./getContactById");
const addContact = require("./addContact");
const updateContactById = require("./updateContactById");
const patchContactById = require('./patchContactById');
const removeContactById = require("./removeContactById");

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  updateContactById,
  patchContactById,
  removeContactById
}