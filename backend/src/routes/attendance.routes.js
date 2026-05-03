const express = require('express');
const router = express.Router();
const { adminAuth, studentAuth } = require('../middlewares/auth.middleware');

// Import attendance controller functions
const {
  createAttendance,
  getAllAttendance,
  getAttendanceById,
  updateAttendance,
  deleteAttendance,
  getTodaysAttendance,
  getMyAttendance,
  getStudentAttendanceStats
} = require('../controllers/attendance.controller');

// Student routes
router.get('/my-attendance', studentAuth, getMyAttendance);
router.get('/my-stats', studentAuth, getStudentAttendanceStats);

// Admin routes (require authentication)
router.post('/', adminAuth, createAttendance);
router.get('/', adminAuth, getAllAttendance);
router.get('/today', adminAuth, getTodaysAttendance);
router.get('/:id', adminAuth, getAttendanceById);
router.put('/:id', adminAuth, updateAttendance);
router.delete('/:id', adminAuth, deleteAttendance);

module.exports = router;