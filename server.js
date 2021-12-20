const express = require('express');
const dotenv = require('dotenv');
// config dotenv
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 5000;

// Route
app.get('/', (req, res) => {
  res.status(200).json({ success: true, msg: 'Show all users' });
});

// Listen Port running, server running on port
app.listen(PORT, console.log(`server running on http://localhost:${PORT}`));
