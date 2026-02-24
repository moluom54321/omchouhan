const express = require('express');
const multer = require('multer');
const path = require('path');
const {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentProfile,
  updateStudentProfile,
  updateStudentProfilePhoto,
  removeStudentProfilePhoto,
  getStudentDashboard
} = require('../controllers/student.controller');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'public', 'uploads')); // Save to public/uploads folder
  },
  filename: (req, file, cb) => {
    // Generate unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'profile-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  // Allow only image files
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Import auth middleware
const { studentAuth, adminAuth } = require('../middlewares/auth.middleware');

const router = express.Router();

// Student routes
router.route('/')
  .get(adminAuth, getAllStudents)
  .post(adminAuth, createStudent);

// Student profile routes (must be before :id route to avoid conflict)
router.route('/profile')
  .get(studentAuth, getStudentProfile)
  .put(studentAuth, upload.single('profilePhoto'), updateStudentProfile);

// Student profile photo routes
router.route('/profile/photo')
  .post(studentAuth, upload.single('profilePhoto'), updateStudentProfilePhoto)
  .delete(studentAuth, removeStudentProfilePhoto);

// Student dashboard route
router.route('/dashboard')
  .get(studentAuth, getStudentDashboard);

router.route('/:id')
  .get(adminAuth, getStudentById)
  .put(adminAuth, updateStudent)
  .delete(adminAuth, deleteStudent);

module.exports = router;