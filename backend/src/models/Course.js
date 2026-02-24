const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Course title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters'],
  },
  description: {
    type: String,
    required: [true, 'Course description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters'],
  },
  price: {
    type: Number,
    required: [true, 'Course price is required'],
    min: [0, 'Price cannot be negative'],
  },
  duration: {
    type: String,
    required: [true, 'Course duration is required'],
    trim: true,
  },
  thumbnail: {
    type: String,
    default: null,
  },
  content: {
    type: String, // URL or file path to course content
    default: null,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Course', courseSchema);