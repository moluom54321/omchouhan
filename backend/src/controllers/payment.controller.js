const Payment = require('../models/Payment');
const Student = require('../models/Student');
const Course = require('../models/Course');

// Get all payments
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find({})
      .populate('student', 'name email')
      .populate('course', 'title');
    res.status(200).json({
      success: true,
      count: payments.length,
      data: payments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// Get payment by ID
const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate('student', 'name email')
      .populate('course', 'title');
    
    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found',
      });
    }
    res.status(200).json({
      success: true,
      data: payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// Create new payment
const createPayment = async (req, res) => {
  try {
    const { student, course, amount, method, transactionId, status, receipt } = req.body;

    // Validate student exists
    const existingStudent = await Student.findById(student);
    if (!existingStudent) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }

    // Validate course exists
    const existingCourse = await Course.findById(course);
    if (!existingCourse) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    const newPayment = new Payment({
      student,
      course,
      amount,
      method,
      transactionId,
      status,
      receipt,
    });

    const payment = await newPayment.save();
    res.status(201).json({
      success: true,
      message: 'Payment created successfully',
      data: payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// Update payment
const updatePayment = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
      .populate('student', 'name email')
      .populate('course', 'title');

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Payment updated successfully',
      data: payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// Delete payment
const deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.id);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Payment deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

module.exports = {
  getAllPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
};