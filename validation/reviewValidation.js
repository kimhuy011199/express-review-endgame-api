const { body } = require('express-validator');
const { ERROR_MSG } = require('../core/constants/errorMessage');

const createReviewValidation = [
  body('title')
    .trim()
    .isLength({ min: 5 })
    .withMessage(ERROR_MSG.REVIEW.TITLE_MIN_LENGTH),
  body('content')
    .trim()
    .isLength({ min: 10 })
    .withMessage(ERROR_MSG.REVIEW.CONTENT_MIN_LENGTH),
  body('stars')
    .trim()
    .isInt({ min: 1, max: 5 })
    .withMessage(ERROR_MSG.REVIEW.STARS_RANGE),
];

module.exports = { createReviewValidation };
