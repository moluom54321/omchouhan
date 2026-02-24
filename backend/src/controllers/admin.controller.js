const Admin = require('../models/Admin');
const { hashPassword } = require('../services/auth.service');

// Get all admins
const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find({}).select('-password');
    res.status(200).json({
      success: true,
      count: admins.length,
      data: admins,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// Get admin by ID
const getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id).select('-password');
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found',
      });
    }
    res.status(200).json({
      success: true,
      data: admin,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// Create new admin
const createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: 'Admin already exists with this email',
      });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
      role: 'admin',
    });

    const admin = await newAdmin.save();
    res.status(201).json({
      success: true,
      message: 'Admin created successfully',
      data: { id: admin._id, name: admin.name, email: admin.email, role: admin.role },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// Update admin
const updateAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).select('-password');

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Admin updated successfully',
      data: admin,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// Delete admin
const deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.params.id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Admin deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// Check email configuration
const checkEmailConfig = async (req, res) => {
  try {
    const isConfigured =
      process.env.GMAIL_USER &&
      process.env.GMAIL_PASSWORD &&
      process.env.GMAIL_PASSWORD !== 'your_google_app_password_here';

    res.status(200).json({
      success: true,
      configured: !!isConfigured,
      message: isConfigured ? 'Email is configured' : 'Email is NOT configured. Please update GMAIL_PASSWORD in .env file.'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

module.exports = {
  getAllAdmins,
  getAdminById,
  createAdmin,
  updateAdmin,
  deleteAdmin,
  checkEmailConfig
};