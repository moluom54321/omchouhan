const express = require('express');
const {
    submitAdmission,
    getAllAdmissions,
    getAdmissionById,
    updateAdmissionStatus,
    getAdmissionStats
} = require('../controllers/admission.controller');
const { adminAuth } = require('../middlewares/auth.middleware');

const router = express.Router();

// Public route - Submit admission
router.post('/', submitAdmission);

// Admin only routes
router.get('/', adminAuth, getAllAdmissions);
router.get('/stats', adminAuth, getAdmissionStats);

router.route('/:id')
    .get(adminAuth, getAdmissionById)
    .put(adminAuth, updateAdmissionStatus);

module.exports = router;