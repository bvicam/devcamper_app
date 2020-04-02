const express = require('express');
const router = express.Router();
const {
  getBootcamp, getBootcamps,
  createBootcamps, deleteBootcamp,
  updateBootcamps
} = require('../controllers/bootcamps')

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