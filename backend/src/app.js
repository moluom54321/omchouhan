const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const corsMiddleware = require('./middlewares/cors.middleware');

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB().then(() => {
  console.log('Initial MongoDB connection attempt successful');
}).catch(error => {
  console.error('Initial MongoDB connection failed:', error.message);
  console.log('Server will continue to run, but database features will be unavailable.');
});

// Enable CORS middleware (must be before routes)
app.use(corsMiddleware);

// Handle preflight requests
app.options('*', corsMiddleware);

// Enable JSON and URL-encoded parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server and database are running',
    timestamp: new Date().toISOString()
  });
});

// API routes - mount all routes under /api
app.use('/api/auth', require('./routes/auth.routes'));

// Direct login routes to match standardized API route structure
const { adminLogin, studentLogin } = require('./controllers/auth.controller');
app.post('/api/admin/login', adminLogin);
app.post('/api/student/login', studentLogin);

// Other API routes
app.use('/api/admin', require('./routes/admin.routes'));
app.use('/api/student', require('./routes/student.routes'));
app.use('/api/admission', require('./routes/admission.routes'));
app.use('/api/payment', require('./routes/payment.routes'));
app.use('/api/guitar-tabs', require('./routes/guitarTab.routes'));
app.use('/api/content', require('./routes/content.routes'));
app.use('/api/attendance', require('./routes/attendance.routes'));
app.use('/api/announcement', require('./routes/announcement.routes'));
app.use('/api/contact', require('./routes/contact.routes'));
app.use('/api/settings', require('./routes/settings.routes'));
app.use('/api/batches', require('./routes/batch.routes'));

// Serve the login page as the main entry point for the admin panel on port 5000
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'admin folder', 'login.html'));
});

// Serve uploaded files from specific directories
app.use('/uploads', express.static(path.join(__dirname, '..', '..', 'public', 'uploads')));

// SATISFY MISSING SCRIPT REFERENCE: Redirect js/pages.js to a dummy response or script
app.get('/js/pages.js', (req, res) => {
  res.type('application/javascript').send('// Pages logic placeholder');
});

// Serve admin folder files first
app.use(express.static(path.join(__dirname, '..', '..', 'admin folder')));

// Serve static files from project root directory (main website)
app.use(express.static(path.join(__dirname, '..', '..')));

// 404 handler for undefined routes
app.use('*', (req, res) => {
  console.log(`Resource not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// Global error handling middleware (must be after routes)
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

module.exports = app;