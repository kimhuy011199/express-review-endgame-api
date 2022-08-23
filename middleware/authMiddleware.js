const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const { ERROR_MSG } = require('../core/constants/errorMessage');

const User = require('../models/userModel');

const authMiddleware = asyncHandler(async (req, res, next) => {
  const headerAuth = req.headers.authorization;
  if (!headerAuth?.startsWith('Bearer') || !headerAuth?.split(' ')[1]) {
    const error = new Error(ERROR_MSG.COMMON.UNAUTHENTICATED);
    error.statusCode = 401;
    throw error;
  }

  const token = headerAuth?.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      const error = new Error(ERROR_MSG.COMMON.INVALID_TOKEN);
      error.statusCode = 400;
      throw error;
    }
    return decoded;
  });

  req.user = await User.findById(decoded.id).select('-password');
  next();
});

module.exports = { authMiddleware };
