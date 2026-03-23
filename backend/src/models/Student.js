const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid email',
    ],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false, // Don't include password in queries by default
  },
  role: {
    type: String,
    enum: ['student'],
    default: 'student',
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  lastLogin: {
    type: Date,
    default: null,
  },
  // Additional student-specific fields
  dateOfBirth: {
    type: Date,
    default: null,
  },
  joinedDate: {
    type: Date,
    default: Date.now,
  },
  address: {
    street: { type: String, default: null },
    city: { type: String, default: null },
    state: { type: String, default: null },
    zipCode: { type: String, default: null },
    country: { type: String, default: null },
  },
  phone: {
    type: String,
    default: null,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    default: null,
  },
  guardianDetails: {
    name: { type: String, default: null },
    phone: { type: String, default: null }
  },
  profilePhoto: {
    type: String,
    default: null,
  },
  selectedCourse: {
    type: [String],
    default: [],
  },
  preferredSchedule: {
    type: [String],
    default: [],
  },
  enrolledCourses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
  }],
  admissionStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'approved'
  },
  paymentStatus: {
    type: String,
    enum: ['unpaid', 'paid', 'refunded'],
    default: 'paid'
  },
  enrollmentStatus: {
    type: String,
    enum: ['not_enrolled', 'enrolled', 'completed'],
    default: 'enrolled'
  },
  branch: {
    type: String,
    default: 'Pitampura'
  },
  transactionId: {
    type: String,
    default: null
  },
  whatsappScreenshotSent: {
    type: Boolean,
    default: false
  },
  isCashPayment: {
    type: Boolean,
    default: false
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Student', studentSchema);