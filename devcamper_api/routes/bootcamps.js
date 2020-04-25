const express = require('express');
const router = express.Router();

const coursesRouter = require('./courses');
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

router.route('/:id/photo').put(bootcampPhotoUpload);

router
  .route('/')
  .get(getBootcamps)
  .post(createBootcamps);

router
  .route('/:id')
  .get(getBootcamp)
  .put(updateBootcamps)
  .delete(deleteBootcamp)

module.exports = router;