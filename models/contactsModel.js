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

// Get all contacts - USE THE EXACT COLLECTION NAME
const getAllContacts = async () => {
  try {
    const contacts = await database.collection('contacts (Week 1-2 project)').find().toArray();
    console.log(`📞 Found ${contacts.length} contacts`);
    return contacts;
  } catch (error) {
    throw new Error('Error fetching contacts: ' + error.message);
  }
};

// Get single contact by ID - USE THE EXACT COLLECTION NAME
const getContactById = async (id) => {
  try {
    const contact = await database.collection('contacts (Week 1-2 project)').findOne({ _id: new ObjectId(id) });
    console.log(`🔍 Contact lookup for ID: ${id} - ${contact ? 'Found' : 'Not found'}`);
    return contact;
  } catch (error) {
    throw new Error('Error fetching contact: ' + error.message);
  }
};

module.exports = { getAllContacts, getContactById };