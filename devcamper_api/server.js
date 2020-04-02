const express = require('express');
const dotenv = require('dotenv');
// Load env vars
dotenv.config({ path: './config/config.env' });

const app = express();

app.get('/api/v1/bootcamps', (req, res) => {
  res.status(200).json({
    sucess: true,
    msg: "Show all bootcamps",
  });
});

// Get by ID
app.get('/api/v1/bootcamp/:id', (req, res) => {
  res.status(200).json({
    sucess: true,
    msg: `Get bootcamp ${req.params.id}`,
  });
});

// Post call: create bootcamp
app.post('/api/v1/bootcamps', (req, res) => {
  res.status(200).json({
    sucess: true,
    msg: `Create new bootcamp`,
  });
});

//Update a bootcampby id
app.put('/api/v1/bootcamp/:id', (req, res) => {
  res.status(200).json({
    sucess: true,
    msg: `Update a bootcamp ${req.params.id}`,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)