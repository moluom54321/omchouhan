const express = require('express');
const router = express.Router();
const { adminAuth } = require('../middlewares/auth.middleware');

// Import attendance controller functions
const {
  createAttendance,
  getAllAttendance,
  getAttendanceById,
  updateAttendance,
  deleteAttendance,
  getTodaysAttendance
} = require('../controllers/attendance.controller');

// Admin routes (require authentication)
router.post('/', adminAuth, createAttendance);
router.get('/', adminAuth, getAllAttendance);
router.get('/today', adminAuth, getTodaysAttendance);  // Add this new route
router.get('/:id', adminAuth, getAttendanceById);
router.put('/:id', adminAuth, updateAttendance);
router.delete('/:id', adminAuth, deleteAttendance);

module.exports = router;