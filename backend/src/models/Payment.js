const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  amount: {
    type: Number,
    required: [true, 'Payment amount is required'],
    min: [0, 'Amount cannot be negative'],
  },
  method: {
    type: String,
    enum: ['online', 'offline', 'cash', 'bank_transfer'],
    default: 'online',
  },
  transactionId: {
    type: String,
    default: null,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending',
    required: true,
  },
  paymentDate: {
    type: Date,
    default: Date.now,
  },
  receipt: {
    type: String,
    default: null,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Payment', paymentSchema);