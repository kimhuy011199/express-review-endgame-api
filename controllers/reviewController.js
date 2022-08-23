const asyncHandler = require('express-async-handler');
const { validationResult } = require('express-validator');
const { ITEMS_PER_PAGE } = require('../core/constants/constants');
const { ERROR_MSG } = require('../core/constants/errorMessage');
const Review = require('../models/reviewModel');
const User = require('../models/userModel');

const getReviews = asyncHandler(async (req, res) => {
  const currentPage = +req.query.page || 1;
  const itemsPerPage = ITEMS_PER_PAGE.REVIEW;
  const totalItems = await Review.find().countDocuments();
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const reviews = await Review.find()
    .skip((currentPage - 1) * itemsPerPage)
    .limit(itemsPerPage);

  const result = {
    reviews,
    totalItems,
    totalPages,
    currentPage,
    itemsPerPage,
  };

  res.status(200).json(result);
});

const getReviewById = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;
  const review = await Review.findById(reviewId);

  if (!review) {
    const error = new Error(ERROR_MSG.REVIEW.NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }

  res.status(200).json(review);
});

const createReview = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(
      errors?.errors[0]?.msg || ERROR_MSG.COMMON.VALIDATE_FAIL
    );
    error.statusCode = 422;
    throw error;
  }

  const { stars, title, content } = req.body;
  const creator = req.user._id;
  const review = await Review.create({
    stars,
    title,
    content,
    creator,
  });
  const user = await User.findById(creator);
  user.reviews.push(review);
  await user.save();

  res.status(201).json(review);
});

const updateReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;
  const review = await Review.findById(reviewId);

  if (!review) {
    const error = new Error(ERROR_MSG.REVIEW.NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }
  if (review.creator.toString() !== req.user._id.toString()) {
    const error = new Error(ERROR_MSG.COMMON.PERMISSION_DENIED);
    error.statusCode = 403;
    throw error;
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(
      errors?.errors[0]?.msg || ERROR_MSG.COMMON.VALIDATE_FAIL
    );
    error.statusCode = 422;
    throw error;
  }

  const { stars, title, content } = req.body;
  review.stars = stars;
  review.title = title;
  review.content = content;
  await review.save();

  res.status(200).json(review);
});

const deleteReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;
  const review = await Review.findById(reviewId);

  if (!review) {
    const error = new Error(ERROR_MSG.REVIEW.NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }
  if (review.creator.toString() !== req.user._id.toString()) {
    const error = new Error(ERROR_MSG.COMMON.PERMISSION_DENIED);
    error.statusCode = 403;
    throw error;
  }

  await review.remove();
  const user = await User.findById(req.user._id);
  user.reviews.pull(review._id);
  await user.save();

  res.status(200).json(review._id);
});

module.exports = {
  getReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
};
