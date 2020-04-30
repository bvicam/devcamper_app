const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler');
const User = require('../models/User');

// @desc      Register user
// @route     POST /api/v1/auth/register
// @access    Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  // Create User
  const user = await User.create({
    name,
    email,
    password,
    role
  });

  // Create Token
  const token = user.getSignedJWTToken();

  res.status(200).json({
    success: true,
    token
  });
});

// @desc      Login user
// @route     POST /api/v1/auth/login
// @access    Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    return next(new ErrorRespose('Please an Email ann Password.', 400));
  }

  // Check for user
  const user = await User.findOne({ email: email }).select('+password');

  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Check if password matches
  const isMatched = await user.matchPassword(password);
  if (!isMatched) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Create Token
  const token = user.getSignedJWTToken();

  res.status(200).json({
    success: true,
    token
  });
});  