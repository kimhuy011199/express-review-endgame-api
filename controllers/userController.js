const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const { validationResult } = require('express-validator');
const { ERROR_MSG } = require('../core/constants/errorMessage');
const User = require('../models/userModel');

const register = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(
      errors?.errors[0]?.msg || ERROR_MSG.COMMON.VALIDATE_FAIL
    );
    error.statusCode = 400;
    throw error;
  }

  const { username, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    reviews: [],
  });

  const token = generateToken(user._id);
  const result = {
    _id: user._id,
    token,
  };

  res.status(201).json(result);
});

const login = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(
      errors?.errors[0]?.msg || ERROR_MSG.COMMON.VALIDATE_FAIL
    );
    error.statusCode = 400;
    throw error;
  }

  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error(ERROR_MSG.USER.INVALID_EMAIL);
    error.statusCode = 401;
    throw error;
  }
  const correctPassword = await bcrypt.compare(password, user.password);
  if (!correctPassword) {
    const error = new Error(ERROR_MSG.USER.INVALID_PASSWORD);
    error.statusCode = 401;
    throw error;
  }

  const token = generateToken(user._id);
  const result = {
    _id: user._id,
    token,
  };

  res.status(201).json(result);
});

const getMe = asyncHandler(async (req, res) => {
  const { user } = req;
  res.status(200).json(user);
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

module.exports = { register, login, getMe };
