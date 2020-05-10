const express = require('express');
const path = require('path');
const colors = require('colors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Route files
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');
const auth = require('./routes/auth');
const users = require('./routes/users');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/db')

const app = express();
const PORT = process.env.PORT || 5000;
// Bootcamps version 1
const bootcampsApiUrl = '/api/v1/bootcamps';
const couresApiUrl = '/api/v1/courses';
const authApiUrl = '/api/v1/auth';
const usersApiUrl = '/api/v1/users';

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

// File uploading.
app.use(fileupload());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser
app.use(express.json());

// Cookie-parser
app.use(cookieParser());

// Mount Router
app.use(bootcampsApiUrl, bootcamps);
app.use(couresApiUrl, courses);
app.use(authApiUrl, auth);
app.use(usersApiUrl, users);

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