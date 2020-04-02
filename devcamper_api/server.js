const express = require('express');
const dotenv = require('dotenv');

// Route files
const bootcamps = require('./routes/bootcamps');

// Load env vars
dotenv.config({ path: './config/config.env' });

const app = express();
const PORT = process.env.PORT || 5000;

// Bootcamps version 1
const bootcampsApiUrl = '/api/v1/bootcamps';
app.use(bootcampsApiUrl, bootcamps);

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)