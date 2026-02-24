const express = require('express');
const router = express.Router();
const batchController = require('../controllers/batch.controller');
const { adminAuth } = require('../middlewares/auth.middleware');

// Public route for admission form
router.get('/', batchController.getBatches);

// Admin routes
router.post('/', adminAuth, batchController.createBatch);
router.put('/:id', adminAuth, batchController.updateBatch);
router.delete('/:id', adminAuth, batchController.deleteBatch);

module.exports = router;
