const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');

// Route files
const bootcamps = require('./routes/bootcamps');
const logger = require('./middleware/logger');
// Load env vars
dotenv.config({ path: './config/config.env' });

const app = express();
const PORT = process.env.PORT || 5000;

// Bootcamps version 1
const bootcampsApiUrl = '/api/v1/bootcamps';

colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});

// Apply middlewares
app.use(logger);
app.use(bootcampsApiUrl, bootcamps);

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)