const express = require('express');
const router = express.Router();

const { protect, authorize } = require('../middleware/auth');
const coursesRouter = require('./courses');
const Bootcamp = require('../models/Bootcamp');
const advancedResults = require('../middleware/advancedResults');
const {
  getBootcamp, getBootcamps,
  createBootcamps, deleteBootcamp,
  updateBootcamps, getBootcampsInRadius, bootcampPhotoUpload
} = require('../controllers/bootcamps')

// Re-route to other router
router.use('/:bootcampId/courses', coursesRouter);

router
  .route('/radius/:zipcode/:distance')
  .get(getBootcampsInRadius)

router.route('/:id/photo').put(protect, authorize('publisher', 'admin'), bootcampPhotoUpload);

router
  .route('/')
  .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
  .post(protect, authorize('publisher', 'admin'), createBootcamps);

router
  .route('/:id')
  .get(getBootcamp)
  .put(protect, authorize('publisher', 'admin'), updateBootcamps)
  .delete(protect, authorize('publisher', 'admin'), deleteBootcamp)

module.exports = router;