const errorHandler = (err, req, res, next) => {
  // if (res.headersSent) {
  //   return next(err)
  // }
  console.log(err.stack.red);
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Server code.'
  })

}

module.exports = errorHandler;