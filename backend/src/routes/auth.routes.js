const express = require('express');
const { adminLogin, studentLogin, logout } = require('../controllers/auth.controller');

const router = express.Router();

// Admin login route - accessible at /api/auth/admin-login (matching frontend API calls)
router.post('/admin-login', adminLogin);

// Student login route - accessible at /api/auth/student-login (matching frontend API calls)
router.post('/student-login', studentLogin);

// Logout route
router.post('/logout', logout);

module.exports = router;