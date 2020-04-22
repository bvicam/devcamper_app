const express = require('express');
const router = express.Router({ mergeParams: true }); // so execpt other router parmas
const {
  getCourses
} = require('../controllers/courses')

router.get('/', getCourses);

module.exports = router;