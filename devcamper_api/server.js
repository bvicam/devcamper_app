const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const morgan = require('morgan');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Route files
const bootcamps = require('./routes/bootcamps');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/db')

const app = express();
const PORT = process.env.PORT || 5000;
// Bootcamps version 1
const bootcampsApiUrl = '/api/v1/bootcamps';

// Connect to DB
connectDB();

// Set console log colors
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

// dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
// Body parser
app.use(express.json());

app.use(bootcampsApiUrl, bootcamps);

// Apply middlewares
// app.use(logger);
app.use(errorHandler);

// Handle unhandle promise Rejection
const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
);

process.on('unhandledRejection', (err, Promise) => {
  console.log(`Error: ${err.message}`.red.bold);
  //  Close Server
  server.close(() => process.exit());
});