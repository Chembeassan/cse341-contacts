require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/contacts', require('./routes/contacts'));

// Basic route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Contacts API is running!',
    endpoints: {
      getAllContacts: 'GET /contacts',
      getContactById: 'GET /contacts/:id'
    }
  });
});

app.listen(port, () => {
  console.log(`🚀 Contacts API running on port ${port}`);
});