const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please add a couse title.']
  },
  description: {
    type: String,
    required: [true, 'Please add a course description.']
  },
  weeks: {
    type: Number,
    required: [true, 'Please add a number of weeks.']
  },
  tuition: {
    type: Number,
    required: [true, 'Please add a tuition cost.']
  },
  minimumSkill: {
    type: String,
    required: [true, 'Please add a minimum skill'],
    enum: ['beginner', 'intermediate', 'advance']
  },
  scholershipAvailable: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  bootcamp: { // Relation with bootcamp 
    type: mongoose.Schema.ObjectId,
    ref: 'Bootcamp',
    required: true
  }
});

module.exports = mongoose.model('Course', CourseSchema);