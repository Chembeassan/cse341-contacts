const contactsModel = require('../models/contactsModel');

// Get all contacts
const getAllContacts = async (req, res) => {
  try {
    const contacts = await contactsModel.getAllContacts();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single contact by ID
const getContactById = async (req, res) => {
  try {
    const contact = await contactsModel.getContactById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    
    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllContacts, getContactById };