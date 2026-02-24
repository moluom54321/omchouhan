const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Import controller functions
const {
  uploadGuitarTab,
  getAllGuitarTabs,
  getLatestSongs,
  getAllTabs,
  getPopularTabs,
  getGuitarTabById,
  updateGuitarTab,
  deleteGuitarTab
} = require('../controllers/guitarTab.controller');

// Import auth middleware
const { adminAuth } = require('../middlewares/auth.middleware');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Create uploads directory if it doesn't exist
    const uploadDir = path.join(__dirname, '../../public/uploads/guitar-tabs');
    const fs = require('fs');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  // Accept images, pdfs, audio files, and text files
  if (file.mimetype.startsWith('audio/') || 
      file.mimetype === 'application/pdf' || 
      file.mimetype === 'text/plain' ||
      file.mimetype === 'text/tab-separated-values' ||
      path.extname(file.originalname).toLowerCase() === '.txt' ||
      path.extname(file.originalname).toLowerCase() === '.tab') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only audio, PDF, TXT, and TAB files are allowed.'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// Admin routes (require authentication) - must come BEFORE public GET routes to avoid conflicts
router.post('/', adminAuth, upload.single('file'), uploadGuitarTab);
router.post('/upload', adminAuth, upload.single('file'), uploadGuitarTab);
router.put('/:id', adminAuth, upload.single('file'), updateGuitarTab);
router.delete('/:id', adminAuth, deleteGuitarTab);

// Public routes (no authentication required)
router.get('/', getAllGuitarTabs);
router.get('/latest', getLatestSongs);
router.get('/all-tabs', require('../controllers/guitarTab.controller').getAllTabs);
router.get('/popular', getPopularTabs);
router.get('/:id', getGuitarTabById);

module.exports = router;