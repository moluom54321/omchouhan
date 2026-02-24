const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  courseType: {
    type: String,
    enum: ['Guitar', 'Piano', 'Instruments', 'Vocal', 'GUITAR', 'PIANO', 'PIANO + INSTRUMENTS', 'VOCAL'],
    required: true
  },
  timeSlot: {
    type: String,
    required: true
  },
  branch: {
    type: String,
    enum: ['Pitampura', 'Rohini'],
    default: 'Pitampura'
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['present', 'absent', 'late'],
    required: true
  },
  notes: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Attendance', attendanceSchema);
