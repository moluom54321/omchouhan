const Student = require('../models/Student');
const Course = require('../models/Course');
const { hashPassword } = require('../services/auth.service');

// Get all students (including pending admissions)
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().select('-password');
    res.status(200).json({
      success: true,
      count: students.length,
      data: students,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// Get student by ID
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).select('-password');
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }
    res.status(200).json({
      success: true,
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// Create new student
const createStudent = async (req, res) => {
  try {
    console.log('Received student data:', req.body); // Debug log
    const { name, email, password, dateOfBirth, address, phone, gender, age, admissionStatus, paymentStatus, enrollmentStatus, selectedCourse } = req.body;

    // Check if student already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: 'Student already exists with this email',
      });
    }

    // Hash password if provided, otherwise use default
    let hashedPassword;
    if (password) {
      hashedPassword = await hashPassword(password);
    } else {
      // Set a default temporary password for admission form submissions
      hashedPassword = await hashPassword('TempPass123!');
    }

    // Properly structure the address object to match Student schema
    const addressObj = {
      street: address?.street || null,
      city: address?.city || null,
      state: address?.state || null,
      zipCode: address?.zipCode || address?.pincode || null,  // Handle both field names
      country: address?.country || null
    };

    const newStudent = new Student({
      name,
      email,
      password: hashedPassword,
      role: 'student',
      dateOfBirth,
      age,
      gender,
      address: addressObj,
      phone,
      selectedCourse: selectedCourse || null,  // Store the course selected by student
      isActive: true,  // Set as active by default for new admissions
      // Set default status for admission form submissions
      admissionStatus: admissionStatus || 'pending',
      paymentStatus: paymentStatus || 'unpaid',
      enrollmentStatus: enrollmentStatus || 'not_enrolled'
    });

    const student = await newStudent.save();
    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      data: { id: student._id, name: student.name, email: student.email, role: student.role },
    });
  } catch (error) {
    console.error('Student creation error:', error); // Debug log
    res.status(500).json({
      success: false,
      message: 'Server Error: ' + error.message,
      error: error.message,
    });
  }
};

// Update student
const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).select('-password');

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Student updated successfully',
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// Delete student
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Student deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// Get student profile data
const getStudentProfile = async (req, res) => {
  try {
    const studentId = req.user.userId; // Use userId from middleware

    // Fetch the student's information
    const student = await Student.findById(studentId).select('-password');

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }

    // Format the response to match frontend expectations
    const profileData = {
      studentId: student._id,
      name: student.name || '-',
      email: student.email || '-',
      phone: student.phone || '-',
      course: student.selectedCourse || '-',
      batch: student.preferredSchedule || 'Not assigned',
      branch: student.branch || 'Main Branch',
      joinedDate: student.joinedDate || student.createdAt || '-',
      admissionDate: student.joinedDate || student.createdAt || '-', // Keep both for backward compatibility or transition
      status: student.admissionStatus || 'pending',
      profilePhoto: student.profilePhoto || null,
      dateOfBirth: student.dateOfBirth || null,
      address: student.address || null,
      gender: student.gender || null,
      guardianDetails: student.guardianDetails || { name: '-', phone: '-' }
    };

    res.status(200).json({
      success: true,
      data: profileData,
    });
  } catch (error) {
    console.error('Student profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// Update student profile
const updateStudentProfile = async (req, res) => {
  try {
    const studentId = req.user.userId;
    const { name, phone, email, dateOfBirth, gender } = req.body;

    // Handle file upload if present
    let updateData = { name, phone, email, dateOfBirth, gender };

    if (req.file) {
      updateData.profilePhoto = '/uploads/' + req.file.filename;
    }

    // Remove undefined fields
    Object.keys(updateData).forEach(key =>
      updateData[key] === undefined && delete updateData[key]
    );

    const student = await Student.findByIdAndUpdate(
      studentId,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: student,
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error: ' + error.message,
      error: error.message,
    });
  }
};

// Update student profile photo
const updateStudentProfilePhoto = async (req, res) => {
  try {
    const studentId = req.user.userId;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No photo uploaded',
      });
    }

    const updateData = {
      profilePhoto: '/uploads/' + req.file.filename
    };

    const student = await Student.findByIdAndUpdate(
      studentId,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Profile photo updated successfully',
      data: {
        profilePhoto: student.profilePhoto
      },
    });
  } catch (error) {
    console.error('Update profile photo error:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error: ' + error.message,
      error: error.message,
    });
  }
};

// Remove student profile photo
const removeStudentProfilePhoto = async (req, res) => {
  try {
    const studentId = req.user.userId;

    const student = await Student.findByIdAndUpdate(
      studentId,
      { profilePhoto: null },
      { new: true, runValidators: true }
    ).select('-password');

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Profile photo removed successfully',
      data: {
        profilePhoto: null
      },
    });
  } catch (error) {
    console.error('Remove profile photo error:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error: ' + error.message,
      error: error.message,
    });
  }
};

// Get student dashboard data
const getStudentDashboard = async (req, res) => {
  try {
    const studentId = req.user.userId; // Use userId from middleware

    // Fetch the student's basic information
    const student = await Student.findById(studentId).select('-password');

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }

    // Fetch student's enrolled courses with populated course details
    const enrolledCourses = await Course.find({
      '_id': { $in: student.enrolledCourses }
    });

    // For now, attendance is empty as we don't have an attendance model yet
    // In future, this would fetch from an attendance collection
    const attendance = [];

    res.status(200).json({
      success: true,
      data: {
        student,
        enrolledCourses,
        attendance,
      },
    });
  } catch (error) {
    console.error('Student dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentProfile,
  updateStudentProfile,
  updateStudentProfilePhoto,
  removeStudentProfilePhoto,
  getStudentDashboard,
};