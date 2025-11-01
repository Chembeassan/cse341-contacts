const { MongoClient, ObjectId } = require('mongodb');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
let database;

async function connectDB() {
  try {
    await client.connect();
    database = client.db();
    console.log('✅ Connected to MongoDB successfully!');
    
    const collections = await database.listCollections().toArray();
    console.log('📋 Available collections:', collections.map(c => c.name));
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    process.exit(1);
  }
}

connectDB();

// Use consistent collection name - choose ONE:
const collectionName = 'contacts'; // Use clean name for new operations

// Get all contacts
const getAllContacts = async () => {
  try {
    const contacts = await database.collection(collectionName).find().toArray();
    console.log(`📞 Found ${contacts.length} contacts`);
    return contacts;
  } catch (error) {
    throw new Error('Error fetching contacts: ' + error.message);
  }
};

// Get single contact by ID
const getContactById = async (id) => {
  try {
    const contact = await database.collection(collectionName).findOne({ _id: new ObjectId(id) });
    console.log(`🔍 Contact lookup for ID: ${id} - ${contact ? 'Found' : 'Not found'}`);
    return contact;
  } catch (error) {
    throw new Error('Error fetching contact: ' + error.message);
  }
};

// Create new contact
const createContact = async (contactData) => {
  try {
    const result = await database.collection(collectionName).insertOne(contactData);
    console.log(`➕ Created new contact with ID: ${result.insertedId}`);
    return result;
  } catch (error) {
    throw new Error('Error creating contact: ' + error.message);
  }
};

// Update contact by ID
const updateContact = async (id, contactData) => {
  try {
    const result = await database.collection(collectionName).updateOne(
      { _id: new ObjectId(id) },
      { $set: contactData }
    );
    console.log(`✏️ Updated contact with ID: ${id} - Matched: ${result.matchedCount}, Modified: ${result.modifiedCount}`);
    return result;
  } catch (error) {
    throw new Error('Error updating contact: ' + error.message);
  }
};

// Delete contact by ID
const deleteContact = async (id) => {
  try {
    const result = await database.collection(collectionName).deleteOne(
      { _id: new ObjectId(id) }
    );
    console.log(`🗑️ Deleted contact with ID: ${id} - Deleted: ${result.deletedCount}`);
    return result;
  } catch (error) {
    throw new Error('Error deleting contact: ' + error.message);
  }
};

// SINGLE export statement (remove the duplicate)
module.exports = { 
  getAllContacts, 
  getContactById, 
  createContact, 
  updateContact, 
  deleteContact 
};