const Bootcamp = require('../models/bootcamp');
const ErrorResponse = require('../utils/errorResponse')

// @desc  Get all bootcamps
// @routes  GET /api/v1/bootcamps
// @access  Public
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();
    res.status(200).json({
      sucess: true,
      length: bootcamps.length,
      data: bootcamps
    });
  } catch (error) {
    next(error);
  }
};

// @desc  Get single bootcamp
// @routes  GET /api/v1/bootcamps/:id
// @access  Public
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp) {
      return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
    }
    res.status(200).json({
      sucess: true,
      data: bootcamp
    });
  } catch (error) {
    next(error);
  }
};

// @desc  Create new bootcamp
// @routes  POST /api/v1/bootcamps
// @access  Public
exports.createBootcamps = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);
    console.log(bootcamp);
    res.status(201).json({
      success: true,
      data: bootcamp
    });
  } catch (err) {
    next(err);
  }
};

// @desc  Update a bootcamp
// @routes  PUT /api/v1/bootcamps/:id
// @access  Public
exports.updateBootcamps = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!bootcamp) {
      return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
    }
    res.status(200).json({
      sucess: true,
      data: bootcamp
    });
  } catch (error) {
    next(error);
  }
};

// @desc  Delete a bootcamp
// @routes  DELETE /api/v1/bootcamp/:id
// @access  Public
exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    if (!bootcamp) {
      return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
    }
    res.status(200).json({
      sucess: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};