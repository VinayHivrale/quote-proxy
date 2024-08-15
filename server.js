const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = 3000;


app.use(cors());


app.get('/', async (req, res) => {
  try {
    // Your asynchronous operations (if any) go here

    res.json({ msg: "hello" });
  } catch (error) {
    // Handle any errors that occurred during the async operations
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
