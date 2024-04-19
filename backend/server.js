const express = require('express');
const axios = require('axios');
const fs = require('fs');
const cors = require('cors'); // Import cors middleware
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to enable CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Route to handle hotel info requests
app.get('/hotel-info/:id', async (req, res) => {
  try {
    const id = req.params.id; // Extract hotel ID from request params
    console.log('Received hotel ID:', id); // Log the received hotel ID

    // You can save the received data to a text file if needed

    const requestData = {
      id,
      language: "en"
    };
    
    const keyId = process.env.KEY_ID;
    const key = process.env.KEY;
    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Buffer.from(`${keyId}:${key}`).toString('base64')
      }
    };
    
    const response = await axios.post(process.env.API_HOTEL_INFO, requestData, axiosConfig);
    const responseData = response.data?.data;
    const metapolicy = responseData.metapolicy_struct;
    const deposit = metapolicy.deposit;
    
    if (metapolicy) {
      res.status(200).json(deposit);
    } else {
      res.status(404).json({ error: 'No data found in the response.' });
    }
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
