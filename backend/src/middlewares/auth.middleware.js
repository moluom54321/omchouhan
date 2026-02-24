const jwt = require('jsonwebtoken');
const config = require('../config/env');

// Available roles
const ROLES = {
  ADMIN: 'admin',
  SUPER_ADMIN: 'super_admin',
  STUDENT: 'student'
};

// Get all available roles
const getAllRoles = () => Object.values(ROLES);

// Middleware to authenticate and authorize users based on roles
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    try {
      // Extract token from header
      const authHeader = req.headers.authorization;
      
      if (!authHeader) {
        return res.status(401).json({
          success: false,
          message: 'Access denied. No token provided.'
        });
      }

      // Extract token from 'Bearer <token>' format
      const token = authHeader.split(' ')[1];
      
      if (!token) {
        return res.status(401).json({
          success: false,
          message: 'Access denied. Invalid token format.'
        });
      }

      // Verify token
      const decoded = jwt.verify(token, config.JWT_SECRET);
      
      // Check if user has required role
      if (roles.length > 0 && !roles.includes(decoded.role)) {
        return res.status(403).json({
          success: false,
          message: `Access denied. Required role(s): ${roles.join(', ')}. Your role: ${decoded.role}`
        });
      }

      // Attach user info to request
      req.user = {
        userId: decoded.userId,
        role: decoded.role,
        email: decoded.email
      };

      next();
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({
          success: false,
          message: 'Invalid token. Please log in again.'
        });
      }
      
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({
          success: false,
          message: 'Token expired. Please log in again.'
        });
      }

      return res.status(500).json({
        success: false,
        message: 'Internal server error during authentication.',
        error: error.message
      });
    }
  };
};

// Middleware for admin access (admin or super_admin)
const adminAuth = authorizeRoles(ROLES.ADMIN, ROLES.SUPER_ADMIN);

// Middleware for student access
const studentAuth = authorizeRoles(ROLES.STUDENT);

// Middleware for any authenticated user
const auth = authorizeRoles();

// Export roles and middleware
module.exports = {
  ROLES,
  getAllRoles,
  authorizeRoles,
  adminAuth,
  studentAuth,
  auth
};