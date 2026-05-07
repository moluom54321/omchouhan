const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

const {
    createBlog,
    getAllBlogs,
    getBlogByIdOrSlug,
    updateBlog,
    deleteBlog
} = require('../controllers/blog.controller');

const { adminAuth, auth } = require('../middlewares/auth.middleware');

// Configure multer for blog image uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.join(__dirname, '../../../public/uploads/blogs');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'blog-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Decode token if present but never block unauthenticated requests.
// The controller uses req.user.role to decide whether to show unpublished blogs.
const optionalAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        return auth(req, res, next);
    }
    next();
};

// Routes
router.route('/')
    .get(optionalAuth, getAllBlogs)
    .post(adminAuth, upload.single('image'), createBlog);

router.route('/slug/:idOrSlug')
    .get(getBlogByIdOrSlug);

router.route('/:idOrSlug')
    .get(getBlogByIdOrSlug);

router.route('/:id')
    .put(adminAuth, upload.single('image'), updateBlog)
    .delete(adminAuth, deleteBlog);

module.exports = router;
