const express = require('express');
const router = express.Router();
const {
  getReviews,
  getReviewById,
  createReview,
  deleteReview,
  updateReview,
} = require('../controllers/reviewController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { mongoIdValidation } = require('../validation/commonValidation');
const { createReviewValidation } = require('../validation/reviewValidation');

router.get('/', getReviews);
router.get('/:reviewId', mongoIdValidation('reviewId'), getReviewById);
router.post('/', authMiddleware, createReviewValidation, createReview);
router.put(
  '/:reviewId',
  authMiddleware,
  mongoIdValidation('reviewId'),
  createReviewValidation,
  updateReview
);
router.delete(
  '/:reviewId',
  authMiddleware,
  mongoIdValidation('reviewId'),
  deleteReview
);

module.exports = router;
