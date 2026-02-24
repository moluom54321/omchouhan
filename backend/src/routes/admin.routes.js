const express = require('express');
const {
  getAllAdmins,
  getAdminById,
  createAdmin,
  updateAdmin,
  deleteAdmin,
  checkEmailConfig
} = require('../controllers/admin.controller');
const { adminAuth } = require('../middlewares/auth.middleware');

const router = express.Router();

// Admin routes
router.route('/')
  .get(adminAuth, getAllAdmins)
  .post(adminAuth, createAdmin);

router.get('/check-email-config', adminAuth, checkEmailConfig);

router.route('/:id')
  .get(adminAuth, getAdminById)
  .put(adminAuth, updateAdmin)
  .delete(adminAuth, deleteAdmin);

module.exports = router;