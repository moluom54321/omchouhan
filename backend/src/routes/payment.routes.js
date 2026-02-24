const express = require('express');
const { 
  getAllPayments, 
  getPaymentById, 
  createPayment, 
  updatePayment, 
  deletePayment 
} = require('../controllers/payment.controller');

const router = express.Router();

// Payment routes
router.route('/')
  .get(getAllPayments)
  .post(createPayment);

router.route('/:id')
  .get(getPaymentById)
  .put(updatePayment)
  .delete(deletePayment);

module.exports = router;