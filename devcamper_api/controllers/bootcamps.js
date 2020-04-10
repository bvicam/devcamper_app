const geocoder = require('../utils/geocoder');
const Bootcamp = require('../models/bootcamp');
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/asyncHandler')

// @desc  Get all bootcamps
// @routes  GET /api/v1/bootcamps
// @access  Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  let query;

  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to Execude
  const removeField = ['select'];

  // Loop over removeField and delete the from reqQuery
  removeField.forEach(i => delete reqQuery[i]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);


  // Create operator($gt, $gte, etc)
  // Advance Search: in = sreachin list, gt = greaterthen, gte= greater then equal
  // lt/lte = less  then / less then equal 
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  // Finding Resource
  query = Bootcamp.find(JSON.parse(queryStr));

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }
  console.log('rakesh', req.query.sort);
  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }
  console.log('rakesh', query);
  // Execute Query
  const bootcamps = await query;
  //Sending response  
  res.status(200).json({
    success: true,
    length: bootcamps.length,
    data: bootcamps
  });
});

// @desc  Get single bootcamp
// @routes  GET /api/v1/bootcamps/:id
// @access  Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
  }
  res.status(200).json({
    sucess: true,
    data: bootcamp
  });
});

// @desc  Create new bootcamp
// @routes  POST /api/v1/bootcamps
// @access  Public
exports.createBootcamps = asyncHandler(async (req, res, next) => {
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
});

// @desc  Update a bootcamp
// @routes  PUT /api/v1/bootcamps/:id
// @access  Public
exports.updateBootcamps = asyncHandler(async (req, res, next) => {
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
});

// @desc  Delete a bootcamp
// @routes  DELETE /api/v1/bootcamp/:id
// @access  Public
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
  if (!bootcamp) {
    return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
  }
  res.status(200).json({
    sucess: true,
    data: {}
  });
});

// @desc  get bootcamps within radius
// @routes  GET /api/v1/bootcamp/radius/:zipcode/:distance
// @access  Public
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  // get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude

  // Cal radius using radians
  // Divide dist by radius of earth.
  // Earth Radius = 3963 mi ? 6,378 kms
  const radius = distance / 3963;

  const bootcamps = await Bootcamp.find({
    location: {
      $geoWithin: { $centerSphere: [[lng, lat], radius] }
    }
  });

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps
  });
});