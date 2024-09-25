const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Middleware to allow all origins
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'authorization,Content-Type,origin,x-requested-with');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '86400'); // Cache preflight response for 1 day

  // Handle preflight (OPTIONS) requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204); // No Content
  }

  next();
});

// Sample route
app.get('/', async (req, res) => {
  try {
    res.json({ msg: "hello" });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API to fetch a quote from external API
app.get('/api/quote', async (req, res) => {
  try {
    const response = await axios.get('https://zenquotes.io/api/random');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching the quote:', error);
    res.status(500).send('Failed to fetch quote.');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`);
});
