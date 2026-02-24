// Payment service functions

// Generate payment receipt
const generateReceipt = (paymentData) => {
  const receipt = {
    id: paymentData._id,
    student: paymentData.student,
    course: paymentData.course,
    amount: paymentData.amount,
    method: paymentData.method,
    status: paymentData.status,
    transactionId: paymentData.transactionId,
    paymentDate: paymentData.paymentDate,
    generatedAt: new Date(),
  };
  
  return receipt;
};

// Validate payment data
const validatePayment = (paymentData) => {
  const errors = [];
  
  if (!paymentData.student) {
    errors.push('Student ID is required');
  }
  
  if (!paymentData.course) {
    errors.push('Course ID is required');
  }
  
  if (!paymentData.amount || paymentData.amount <= 0) {
    errors.push('Valid amount is required');
  }
  
  if (!paymentData.method) {
    errors.push('Payment method is required');
  }
  
  if (!paymentData.status) {
    errors.push('Payment status is required');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Process payment
const processPayment = async (paymentData) => {
  try {
    // Here you would integrate with payment gateway
    // For now, just return the payment data with updated status
    return {
      ...paymentData,
      status: 'completed',
      processedAt: new Date()
    };
  } catch (error) {
    throw new Error(`Payment processing failed: ${error.message}`);
  }
};

module.exports = {
  generateReceipt,
  validatePayment,
  processPayment,
};