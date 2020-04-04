const Bootcamp = require('../models/bootcamp')

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
    res.status(400).json({
      sucess: false,
      error: error.errmsg
    });
  }
};

// @desc  Get single bootcamp
// @routes  GET /api/v1/bootcamps/:id
// @access  Public
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp) {
      return res.status(400).json({
        sucess: false,
        data: bootcamp
      });
    }
    res.status(200).json({
      sucess: true,
      data: bootcamp
    });
  } catch (error) {
    res.status(400).json({
      sucess: false,
      error: error.errmsg
    });
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
    res.status(400).json({
      success: false,
      error: err.errmsg
    });
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
      return res.status(400).json({
        sucess: false,
        data: bootcamp
      });
    }
    res.status(200).json({
      sucess: true,
      data: bootcamp
    });
  } catch (error) {
    res.status(400).json({
      sucess: false,
      error: error.errmsg
    });
  }
};

// @desc  Delete a bootcamp
// @routes  DELETE /api/v1/bootcamp/:id
// @access  Public
exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    if (!bootcamp) {
      return res.status(400).json({
        sucess: false,
        data: bootcamp
      });
    }
    res.status(200).json({
      sucess: true,
      data: {}
    });
  } catch (error) {
    res.status(400).json({
      sucess: false,
      error: error.errmsg
    });
  }
};