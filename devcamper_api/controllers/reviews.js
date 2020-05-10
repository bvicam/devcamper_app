const Review = require('../models/Review');
const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/asyncHandler')

// @desc  Get all reviews
// @routes  GET /api/v1/reviews
// @routes  GET /api/v1/bootcamps/:bootcampId/reviews
// @access  Public
exports.getReviews = asyncHandler(async (req, res, next) => {
  if (req.params.bootcampId) {
    const reviews = await Review.find({ bootcamp: req.params.bootcampId });
    res.status(200).json({
      success: true,
      length: reviews.length,
      data: reviews
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @desc  Get single review
// @routes  GET /api/v1/reviews/:id
// @access  Public
exports.getReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id).populate({
    path: 'Bootcamp',
    select: 'name description'
  });

  if (!review) {
    return next(new ErrorResponse(`No review found by id: ${req.params.id}`), 404);
  }

  res.status(200).json({
    success: true,
    data: review
  });
});

// @desc      Add review
// @route     POST /api/v1/bootcamps/:bootcampId/reviews
// @access    Private
exports.addReview = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;
  req.body.user = req.user.id;

  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `No bootcamp with the id of ${req.params.bootcampId}`,
        404
      )
    );
  }

  const review = await Review.create(req.body);

  res.status(201).json({
    success: true,
    data: review
  });
});

// @desc  Update review
// @routes  PUT /api/v1/bootcamps/:bootcampId/reviews
// @access  Private
exports.updateReview = asyncHandler(async (req, res, next) => {
  let review = await Review.findById(req.params.id);
  if (!Review) {
    return next(new ErrorResponse(`No Review found by id: ${req.params.id}`), 404);
  }
  // Make sure user is bootcamp owner
  if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`User ${req.user.id} is not authorize to update a review ${review._id}`, 401));
  }
  review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: review
  });
});

// @desc  Delete review
// @routes  DELETE /api/v1/bootcamps/:bootcampId/reviews
// @access  Private
exports.deleteReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return next(new ErrorResponse(`No review found by id: ${req.params.id}`.red), 404);
  }
  // Make sure user is bootcamp owner
  if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`User ${req.user.id} is not authorize to delete a review ${review._id}`, 401));
  }
  await review.remove()
  res.status(200).json({
    success: true,
    data: {}
  });
});
