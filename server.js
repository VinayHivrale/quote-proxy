const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Chrome extension ID for allowed origin
const allowedExtensionOrigin = 'chrome-extension://ghppifoijpmjlogocmefjfaagilfjjbn';

app.use((req, res, next) => {
  const origin = req.get('Origin');

  // Check if the origin is the allowed extension or not
  if (origin === allowedExtensionOrigin || !origin) {
    res.setHeader('Access-Control-Allow-Origin', allowedExtensionOrigin);
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'authorization,Content-Type,origin,x-requested-with');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Max-Age', '86400'); // Cache preflight response

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      return res.sendStatus(204); // No Content
    }
  } else {
    // If the origin is not allowed, send a CORS error response
    return res.status(403).json({ error: 'Forbidden' });
  }

  next();
});

app.get('/', async (req, res) => {
  try {
    res.json({ msg: "hello" });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/quote', async (req, res) => {
  try {
    const response = await axios.get('https://zenquotes.io/api/today');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching the quote:', error);
    res.status(500).send('Failed to fetch quote.');
  }
});

app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`);
});
