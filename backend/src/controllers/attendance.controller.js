const Attendance = require('../models/Attendance');
const Student = require('../models/Student');
const Course = require('../models/Course');
const mongoose = require('mongoose');

// Create attendance record
const createAttendance = async (req, res) => {
  try {
    const { records, studentId, courseType, timeSlot, date, status, notes, branch } = req.body;

    const queryDate = new Date(date || new Date());
    queryDate.setHours(0, 0, 0, 0);
    const start = new Date(queryDate);
    const end = new Date(queryDate);
    end.setHours(23, 59, 59, 999);

    // Handle single record
    if (!records || !Array.isArray(records)) {
      await Attendance.findOneAndUpdate(
        {
          student: studentId,
          courseType,
          timeSlot,
          branch: branch || 'Pitampura',
          date: { $gte: start, $lte: end }
        },
        {
          student: studentId,
          courseType,
          timeSlot,
          branch: branch || 'Pitampura',
          date: date ? new Date(date) : new Date(),
          status: status || 'absent',
          notes: notes || ''
        },
        { upsert: true, new: true }
      );
      return res.status(201).json({ success: true, message: 'Attendance marked/updated' });
    }

    // Handle bulk records [ { studentId, status, ... } ]
    const attendancePromises = records.map(async (record) => {
      return Attendance.findOneAndUpdate(
        {
          student: record.studentId,
          courseType: courseType || record.courseType,
          timeSlot: timeSlot || record.timeSlot,
          branch: branch || record.branch || 'Pitampura',
          date: { $gte: start, $lte: end }
        },
        {
          student: record.studentId,
          courseType: courseType || record.courseType,
          timeSlot: timeSlot || record.timeSlot,
          branch: branch || record.branch || 'Pitampura',
          date: date ? new Date(date) : (record.date ? new Date(record.date) : new Date()),
          status: record.status || 'absent',
          notes: record.notes || ''
        },
        { upsert: true, new: true }
      );
    });

    await Promise.all(attendancePromises);

    res.status(201).json({
      success: true,
      message: `${records.length} Attendance records saved/updated successfully`
    });
  } catch (error) {
    console.error('Create attendance error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Get all attendance records
const getAllAttendance = async (req, res) => {
  try {
    const { studentId, courseId, courseType, timeSlot, startDate, endDate, status, branch, date } = req.query;

    let filter = {};

    if (studentId) filter.student = new mongoose.Types.ObjectId(studentId);
    if (courseId) filter.course = courseId;
    if (courseType) filter.courseType = courseType;
    if (timeSlot) filter.timeSlot = timeSlot;
    if (status) filter.status = status;
    if (branch) filter.branch = branch;

    if (date) {
        const queryDate = new Date(date);
        queryDate.setHours(0, 0, 0, 0);
        const start = new Date(queryDate);
        const end = new Date(queryDate);
        end.setHours(23, 59, 59, 999);
        filter.date = { $gte: start, $lte: end };
    } else if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    const attendanceRecords = await Attendance.find(filter)
      .populate('student', 'name email phone')
      .sort({ date: -1 });

    res.status(200).json({
      success: true,
      data: attendanceRecords
    });
  } catch (error) {
    console.error('Get attendance error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Get attendance by ID
const getAttendanceById = async (req, res) => {
  try {
    const { id } = req.params;

    const attendance = await Attendance.findById(id)
      .populate('student', 'name email phone');

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: 'Attendance record not found'
      });
    }

    res.status(200).json({
      success: true,
      data: attendance
    });
  } catch (error) {
    console.error('Get attendance by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Update attendance record
const updateAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes, date } = req.body;

    const attendance = await Attendance.findByIdAndUpdate(
      id,
      {
        status,
        notes: notes || '',
        date: date ? new Date(date) : undefined
      },
      { new: true }
    ).populate('student', 'name email phone');

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: 'Attendance record not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Attendance updated successfully',
      data: attendance
    });
  } catch (error) {
    console.error('Update attendance error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Delete attendance record
const deleteAttendance = async (req, res) => {
  try {
    const { id } = req.params;

    const attendance = await Attendance.findByIdAndDelete(id);

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: 'Attendance record not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Attendance record deleted successfully'
    });
  } catch (error) {
    console.error('Delete attendance error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Get today's attendance records
const getTodaysAttendance = async (req, res) => {
  try {
    // Calculate today's date range (from start to end of day)
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    // Find attendance records for today
    const attendanceRecords = await Attendance.find({
      date: {
        $gte: startOfDay,
        $lte: endOfDay
      }
    })
      .populate('student', 'name email phone')
      .sort({ date: -1 });

    res.status(200).json({
      success: true,
      data: attendanceRecords
    });
  } catch (error) {
    console.error('Get today\'s attendance error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Get logged-in student's attendance records
const getMyAttendance = async (req, res) => {
  try {
    const studentId = req.user.userId;
    const { startDate, endDate, status } = req.query;

    let filter = { student: studentId };

    if (status) filter.status = status;

    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    const attendanceRecords = await Attendance.find(filter)
      .sort({ date: -1 });

    res.status(200).json({
      success: true,
      data: attendanceRecords
    });
  } catch (error) {
    console.error('Get my attendance error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Get stats for student attendance
const getStudentAttendanceStats = async (req, res) => {
  try {
    const studentId = req.user.userId;

    const stats = await Attendance.aggregate([
      { $match: { student: new mongoose.Types.ObjectId(studentId) } },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          present: {
            $sum: { $cond: [{ $eq: ['$status', 'present'] }, 1, 0] }
          },
          absent: {
            $sum: { $cond: [{ $eq: ['$status', 'absent'] }, 1, 0] }
          },
          late: {
            $sum: { $cond: [{ $eq: ['$status', 'late'] }, 1, 0] }
          }
        }
      }
    ]);

    const result = stats.length > 0 ? stats[0] : { total: 0, present: 0, absent: 0, late: 0 };
    
    // Calculate percentage
    result.percentage = result.total > 0 ? ((result.present / result.total) * 100).toFixed(2) : 0;

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Get student attendance stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

module.exports = {
  createAttendance,
  getAllAttendance,
  getAttendanceById,
  updateAttendance,
  deleteAttendance,
  getTodaysAttendance,
  getMyAttendance,
  getStudentAttendanceStats
};