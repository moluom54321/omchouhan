const express = require('express');
const {
  getAllPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment
} = require('../controllers/payment.controller');
const { adminAuth } = require('../middlewares/auth.middleware');

const router = express.Router();

// Payment routes (admin only)
router.route('/')
  .get(adminAuth, getAllPayments)
  .post(adminAuth, createPayment);

router.route('/:id')
  .get(adminAuth, getPaymentById)
  .put(adminAuth, updatePayment)
  .delete(adminAuth, deletePayment);

module.exports = router;