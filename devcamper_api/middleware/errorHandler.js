const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.msg = error.message;
  // Log to console for dev
  console.log(err);

  // Mongoose Bad Id
  if (err.name === 'CastError') {
    const msg = `Resource not found with id of ${err.value}`;
    error = new ErrorResponse(msg, 404);
  }

  // Mongoose Duplicate Key
  if (err.code === 11000) {
    const msg = `Duplicate Field value entered.`;
    error = new ErrorResponse(msg, 400);
  }

  // Mongoose Validation Error
  if (err.name === 'ValidationError') {
    const msg = err.message;
    error = new ErrorResponse(msg, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server code.'
  })

}

module.exports = errorHandler;