const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    sucess: true,
    msg: "Show all bootcamps",
  });
});

// Get by ID
router.get('/:id', (req, res) => {
  res.status(200).json({
    sucess: true,
    msg: `Get bootcamp ${req.params.id}`,
  });
});

// Post call: create bootcamp
router.post('/', (req, res) => {
  res.status(200).json({
    sucess: true,
    msg: `Create new bootcamp`,
  });
});

//Update a bootcampby id
router.put('/:id', (req, res) => {
  res.status(200).json({
    sucess: true,
    msg: `Update a bootcamp ${req.params.id}`,
  });
});

module.exports = router;