const express = require('express');
const router = express.Router();
const { createAnnouncement, getAnnouncements, deleteAnnouncement } = require('../controllers/announcement.controller');
const { adminAuth, auth } = require('../middlewares/auth.middleware');

// Publicly accessible for authenticated users (students and admins)
router.get('/', auth, getAnnouncements);

// Admin only routes
router.post('/', adminAuth, createAnnouncement);
router.delete('/:id', adminAuth, deleteAnnouncement);

module.exports = router;
