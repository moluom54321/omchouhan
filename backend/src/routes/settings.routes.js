const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settings.controller');
const { adminAuth } = require('../middlewares/auth.middleware');

// Public routes
router.get('/', settingsController.getSettings);

// Admin routes
router.put('/', adminAuth, settingsController.updateSettings);

module.exports = router;
