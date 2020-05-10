const express = require('express');

const advancedResults = require('../middleware/advancedResults');
const Review = require('../models/Review');
const { protect, authorize } = require('../middleware/auth');
const router = express.Router({ mergeParams: true }); // so execpt other router parmas
const {
  getReviews, getReview, addReview, updateReview, deleteReview
} = require('../controllers/reviews')

router.route('/')
  .get(advancedResults(Review, {
    path: 'bootcamp',
    select: 'name description'
  }), getReviews)
  .post(protect, authorize('publisher', 'admin'), addReview);

router
  .route('/:id')
  .get(getReview)
  .put(protect, authorize('publisher', 'admin'), updateReview)
  .delete(protect, authorize('publisher', 'admin'), deleteReview);

module.exports = router;