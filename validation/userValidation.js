const { body } = require('express-validator');
const { ERROR_MSG } = require('../core/constants/errorMessage');
const User = require('../models/userModel');

const PASSWORD_AT_LEAST_1_NUMBER = /^(?=.*?[0-9])/;

const registerValidation = [
  body('email')
    .trim()
    .isEmail()
    .withMessage(ERROR_MSG.USER.INVALID_EMAIL)
    .custom((value) => {
      return User.findOne({ email: value }).then((user) => {
        if (user) {
          return Promise.reject(ERROR_MSG.USER.EXISTED_EMAIL);
        }
      });
    })
    .normalizeEmail(),
  body('username')
    .trim()
    .isLength({ min: 5 })
    .withMessage(ERROR_MSG.USER.USERNAME_LENGTH),
  body('password')
    .trim()
    .isLength({ min: 6 })
    .withMessage(ERROR_MSG.USER.PASSWORD_LENGTH)
    .custom((value) => {
      if (!value.match(PASSWORD_AT_LEAST_1_NUMBER)) {
        throw new Error(ERROR_MSG.USER.PASSWORD_NUMBER);
      }
      return true;
    }),
];

const loginValidation = [
  body('email')
    .trim()
    .isEmail()
    .withMessage(ERROR_MSG.USER.INVALID_EMAIL)
    .normalizeEmail(),
  body('password')
    .trim()
    .isLength({ min: 6 })
    .withMessage(ERROR_MSG.USER.PASSWORD_LENGTH)
    .custom((value) => {
      if (!value.match(PASSWORD_AT_LEAST_1_NUMBER)) {
        throw new Error(ERROR_MSG.USER.PASSWORD_NUMBER);
      }
      return true;
    }),
];

module.exports = { registerValidation, loginValidation };
