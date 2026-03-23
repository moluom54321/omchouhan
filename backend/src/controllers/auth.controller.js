const Admin = require('../models/Admin');
const Student = require('../models/Student');
const { hashPassword, comparePassword, generateToken } = require('../services/auth.service');

// Admin login - supports both email/password and username/password for compatibility
const adminLogin = async (req, res) => {
  try {
    // Check if body exists
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: 'Request body is required.',
      });
    }

    const { email, password, username } = req.body;

    // If email is provided, use database authentication first (primary method)
    if (email && password) {
      console.log('Attempting admin login for:', email);
      // Find admin by email (include password)
      const admin = await Admin.findOne({ email }).select('+password');
      console.log('Admin find result:', admin ? 'Found' : 'Not Found');

      if (!admin) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password.',
        });
      }

      // Check password
      console.log('Checking password...');
      const isPasswordValid = await comparePassword(password, admin.password);
      console.log('Password valid:', isPasswordValid);

      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password.',
        });
      }

      // Check if admin is active
      if (!admin.isActive) {
        return res.status(401).json({
          success: false,
          message: 'Account is deactivated.',
        });
      }

      // Validate role exists before generating token
      if (!admin.role) {
        console.error('Admin role is undefined for admin:', admin._id);
        return res.status(500).json({
          success: false,
          message: 'Internal server error: Admin role is undefined.',
        });
      }

      // Generate JWT token (contains admin id, role, and email)
      console.log('Generating token...');
      const token = generateToken(admin._id, admin.role, admin.email);
      console.log('Token generated successfully');

      // Update last login
      console.log('Updating last login...');
      admin.lastLogin = new Date();
      await admin.save();
      console.log('Admin saved successfully');

      res.status(200).json({
        success: true,
        message: 'Admin login successful.',
        token,
        user: {
          id: admin._id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
        },
      });
    } else {
      // No fallback credentials allowed - only database authentication
      return res.status(400).json({
        success: false,
        message: 'Email and password are required.',
      });
    }
  } catch (error) {
    console.error('Admin login error:', error);

    // Check if it's a database connection or buffering error
    const isDbError =
      error.name === 'MongooseServerSelectionError' ||
      error.message.includes('connect') ||
      error.message.includes('buffering timed out') ||
      mongoose.connection.readyState === 0;

    if (isDbError) {
      return res.status(503).json({
        success: false,
        message: 'Database connection failed. Your internet IP might not be whitelisted. Please check MONGODB_FIX_GUIDE.md in the project folder for the permanent fix.',
        error: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error.',
      error: error.message,
    });
  }
};

// Student login - supports both email/password and studentId/password for compatibility
const studentLogin = async (req, res) => {
  try {
    // Check if body exists
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: 'Request body is required.',
      });
    }

    const { email, password, studentId } = req.body;

    // If email is provided, use database authentication first (primary method)
    if (email && password) {
      // Find student by email (include password)
      const student = await Student.findOne({ email }).select('+password');
      if (!student) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password.',
        });
      }

      // Check password
      const isPasswordValid = await comparePassword(password, student.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password.',
        });
      }

      // Check if student is active
      if (!student.isActive) {
        return res.status(401).json({
          success: false,
          message: 'Account is deactivated.',
        });
      }

      // Check if admission is pending
      if (student.admissionStatus === 'pending') {
        return res.status(401).json({
          success: false,
          message: 'Your admission is still pending admin verification. Please wait until your payment is verified.',
        });
      }

      // Validate role exists before generating token
      if (!student.role) {
        console.error('Student role is undefined for student:', student._id);
        return res.status(500).json({
          success: false,
          message: 'Internal server error: Student role is undefined.',
        });
      }

      // Generate JWT token (contains student id, role, and email)
      const token = generateToken(student._id, student.role, student.email);

      // Update last login
      student.lastLogin = new Date();
      await student.save();

      res.status(200).json({
        success: true,
        message: 'Student login successful.',
        token,
        user: {
          id: student._id,
          name: student.name,
          email: student.email,
          role: student.role,
        },
      });
    } else {
      // No fallback credentials allowed - only database authentication
      return res.status(400).json({
        success: false,
        message: 'Email and password are required.',
      });
    }
  } catch (error) {
    console.error('Student login error:', error);

    // Check if it's a database connection or buffering error
    const isDbError =
      error.name === 'MongooseServerSelectionError' ||
      error.message.includes('connect') ||
      error.message.includes('buffering timed out') ||
      mongoose.connection.readyState === 0;

    if (isDbError) {
      return res.status(503).json({
        success: false,
        message: 'Database connection failed. Please ensure your IP is whitelisted in MongoDB Atlas.',
        error: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error.',
      error: error.message,
    });
  }
};

// Logout (simply clear token on frontend)
const logout = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Logout successful.',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error.',
      error: error.message,
    });
  }
};

module.exports = {
  adminLogin,
  studentLogin,
  logout,
};