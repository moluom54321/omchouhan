const express = require('express');
const router = express.Router();
const contentController = require('../controllers/content.controller');
const { adminAuth } = require('../middlewares/auth.middleware');

// Public routes
router.get('/type/:type', contentController.getContentByType);
router.get('/:id', contentController.getContentById);

// Admin routes (require authentication)
router.post('/', adminAuth, contentController.uploadContent);
router.get('/', adminAuth, contentController.getAllContent);
router.put('/:id', adminAuth, contentController.updateContent);
router.delete('/:id', adminAuth, contentController.deleteContent);
router.post('/reorder', adminAuth, contentController.reorderContent);

module.exports = router;
