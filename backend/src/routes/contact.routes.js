const express = require('express');
const {
    submitContact,
    getAllContacts,
    getContactById,
    replyToContact,
    deleteContact,
    getContactStats
} = require('../controllers/contact.controller');
const { adminAuth } = require('../middlewares/auth.middleware');

const router = express.Router();

// Public route - Submit contact form (no auth required)
router.post('/submit', submitContact);

// Admin only routes
router.get('/', adminAuth, getAllContacts);
router.get('/stats', adminAuth, getContactStats);

// Get single contact by ID
router.get('/:id', adminAuth, getContactById);

// Reply to a contact message
router.post('/:id/reply', adminAuth, replyToContact);

// Delete a contact
router.delete('/:id', adminAuth, deleteContact);

module.exports = router;
