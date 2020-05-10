const express = require('express');

const advancedResults = require('../middleware/advancedResults');
const Review = require('../models/Review');
const { protect, authorize } = require('../middleware/auth');
const router = express.Router({ mergeParams: true }); // so execpt other router parmas
const {
  getReviews
} = require('../controllers/reviews')

router.route('/')
  .get(advancedResults(Review, {
    path: 'bootcamp',
    select: 'name description'
  }), getReviews)

module.exports = router;