const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please add a title for review'],
    maxlength: 100
  },
  text: {
    type: String,
    required: [true, 'Please add a some text.']
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
    required: [true, 'Please add rating between 1 tp 10.']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  bootcamp: { // Relation with bootcamp 
    type: mongoose.Schema.ObjectId,
    ref: 'Bootcamp',
    required: true
  },
  user: { // Relation with user 
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
});

// Prevent user from submitting more then one review per bootcamp.
ReviewSchema.index({ bootcamp: 1, user: 1 }, { unique: true })

module.exports = mongoose.model('Review', ReviewSchema);