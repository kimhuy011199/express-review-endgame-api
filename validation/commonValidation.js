const { param } = require('express-validator');
const { ERROR_MSG } = require('../core/constants/errorMessage');
const ObjectId = require('mongoose').Types.ObjectId;

const mongoIdValidation = (paramName) => [
  param(paramName).customSanitizer((value) => {
    if (!ObjectId.isValid(value)) {
      throw new Error(ERROR_MSG.COMMON.INVALID_ID);
    }
    return ObjectId(value);
  }),
];

module.exports = { mongoIdValidation };
