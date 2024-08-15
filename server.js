const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = 3000;

// Chrome extension ID for allowed origin
const allowedExtensionOrigin = 'chrome-extension://ghppifoijpmjlogocmefjfaagilfjjbn';

// CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    if (origin === allowedExtensionOrigin || !origin) {
      // Allow requests from the specified extension and allow non-browser requests (e.g., from localhost for testing)
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET'], // Allow only GET requests
  allowedHeaders: 'authorization,Content-Type,origin, x-requested-with',
  credentials: true
};

app.use(cors(corsOptions));

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
