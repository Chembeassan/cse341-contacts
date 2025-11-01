const contactsModel = require('../models/contactsModel');

// Get all contacts (existing)
const getAllContacts = async (req, res) => {
  try {
    const contacts = await contactsModel.getAllContacts();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single contact by ID (existing)
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

// CREATE NEW CONTACT (NEW)
const createContact = async (req, res) => {
  try {
    // Validate required fields
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    
    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({ 
        error: 'All fields are required: firstName, lastName, email, favoriteColor, birthday' 
      });
    }

    const contactData = {
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday,
      createdAt: new Date()
    };

    const result = await contactsModel.createContact(contactData);
    res.status(201).json({
      message: 'Contact created successfully',
      id: result.insertedId
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE CONTACT (NEW)
const updateContact = async (req, res) => {
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    
    // Check if at least one field is provided
    if (!firstName && !lastName && !email && !favoriteColor && !birthday) {
      return res.status(400).json({ 
        error: 'At least one field must be provided for update' 
      });
    }

    const updateData = {};
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (email) updateData.email = email;
    if (favoriteColor) updateData.favoriteColor = favoriteColor;
    if (birthday) updateData.birthday = birthday;
    updateData.updatedAt = new Date();

    const result = await contactsModel.updateContact(req.params.id, updateData);
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.status(200).json({ 
      message: 'Contact updated successfully',
      modifiedCount: result.modifiedCount 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE CONTACT (NEW)
const deleteContact = async (req, res) => {
  try {
    const result = await contactsModel.deleteContact(req.params.id);
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.status(200).json({ 
      message: 'Contact deleted successfully',
      deletedCount: result.deletedCount 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Export all functions
module.exports = { 
  getAllContacts, 
  getContactById, 
  createContact, 
  updateContact, 
  deleteContact 
};