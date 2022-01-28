const fs = require('fs/promises')

const path = require("path");

const {v4} = require("uuid");

const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

const getContactById = async (id) => {
  const contacts =  await listContacts();  
  const result = contacts.find(contact => contact.id === id);
  if(!result){
    return null;
  }  
  return result;
}

const removeContact = async (id) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(contact => contact.id === id);
    if (idx === -1) {
    return null
  }

  const newContacts = contacts.filter((_, index) => index !== idx);
  await fs.writeFile(contactsPath, JSON.stringify(newContacts));
  return contacts[idx] 
}

const addContact = async (name, phone, email) => {
  const contacts = await listContacts();
  const newContact = {name, phone, email, id: v4()};
  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts))
  return newContact;
}

const updateContact = async (id, name, phone, email) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(contact => contact.id === id);
  if (idx === -1) {
    return null
  }
  contacts[idx] = {id, name, phone, email}
  await fs.writeFile(contactsPath, JSON.stringify(contacts))
  return contacts[idx];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
