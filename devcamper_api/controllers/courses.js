const Course = require('../models/Course');
const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/asyncHandler')

// @desc  Get all courses
// @routes  GET /api/v1/courses
// @routes  GET /api/v1/bootcamps/:bootcampId/courses
// @access  Public
exports.getCourses = asyncHandler(async (req, res, next) => {
  let query;
  if (req.params.bootcampId) {
    query = Course.find({ bootcamp: req.params.bootcampId });
  } else {
    query = Course.find().populate({
      path: 'bootcamp',
      select: 'name description'
    });
  }
  const courses = await query;

  res.status(200).json({
    success: true,
    length: courses.length,
    data: courses
  });
});

// @desc  Get single course
// @routes  GET /api/v1/courses/:id
// @access  Public
exports.getCourse = asyncHandler(async (req, res, next) => {
  const course = (await Course.findById(req.params.id)).populate({
    path: 'Bootcamp',
    select: 'name description'
  });

  if (!course) {
    return next(new ErrorResponse(`No course found by id: ${req.params.id}`), 404);
  }

  res.status(200).json({
    success: true,
    data: course
  });
});

// @desc  Add course
// @routes  POST /api/v1/bootcamps/:bootcampId/courses
// @access  Private
exports.addCourse = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;
  const bootcamp = await Bootcamp.findById(req.params.bootcampId);
  if (!bootcamp) {
    return next(new ErrorResponse(`No Bootcamp found by id: ${req.params.bootcampId}`.red), 404);
  }
  const course = await Course.create(req.body);
  res.status(201).json({
    success: true,
    data: course
  });
});

// @desc  Update course
// @routes  PUT /api/v1/bootcamps/:bootcampId/courses
// @access  Private
exports.updateCourse = asyncHandler(async (req, res, next) => {
  let course = await Course.findById(req.params.id);
  if (!Course) {
    return next(new ErrorResponse(`No Course found by id: ${req.params.id}`.red), 404);
  }
  course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: course
  });
});

// @desc  Delete course
// @routes  DELETE /api/v1/bootcamps/:bootcampId/courses
// @access  Private
exports.deleteCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(new ErrorResponse(`No course found by id: ${req.params.id}`.red), 404);
  }
  await course.remove()
  res.status(200).json({
    success: true,
    data: {}
  });
});
