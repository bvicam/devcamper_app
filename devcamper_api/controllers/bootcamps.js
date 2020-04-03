const Bootcamp = require('../models/bootcamp')

// @desc  Get all bootcamps
// @routes  GET /api/v1/bootcamps
// @access  Public
exports.getBootcamps = (req, res, next) => {
  res.status(200).json({
    sucess: true,
    msg: "Show all bootcamps",
  });
};

// @desc  Get single bootcamp
// @routes  GET /api/v1/bootcamps/:id
// @access  Public
exports.getBootcamp = (req, res, next) => {
  res.status(200).json({
    sucess: true,
    msg: `Get bootcamp ${req.params.id}`,
  });
};

// @desc  Create new bootcamp
// @routes  POST /api/v1/bootcamps
// @access  Public
exports.createBootcamps = async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);
  console.log(bootcamp);
  res.status(201).json({
    success: true,
    data: bootcamp
  });
};

// @desc  Update a bootcamp
// @routes  PUT /api/v1/bootcamps/:id
// @access  Public
exports.updateBootcamps = (req, res, next) => {
  res.status(200).json({
    sucess: true,
    msg: `Update new bootcamp`,
  });
};

// @desc  Delete a bootcamp
// @routes  DELETE /api/v1/bootcamp/:id
// @access  Public
exports.deleteBootcamp = (req, res, next) => {
  res.status(200).json({
    sucess: true,
    msg: `Delete a bootcamp ${req.params.id}`,
  });
};