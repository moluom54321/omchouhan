const Attendance = require('../models/Attendance');
const Student = require('../models/Student');
const Course = require('../models/Course');

// Create attendance record
const createAttendance = async (req, res) => {
  try {
    const { records, studentId, courseType, timeSlot, date, status, notes } = req.body;

    // Handle single record
    if (!records || !Array.isArray(records)) {
      const attendance = new Attendance({
        student: studentId,
        courseType,
        timeSlot,
        date: date ? new Date(date) : new Date(),
        status: status || 'absent',
        notes: notes || ''
      });
      await attendance.save();
      return res.status(201).json({ success: true, message: 'Attendance marked' });
    }

    // Handle bulk records [ { studentId, status, ... } ]
    const attendancePromises = records.map(async (record) => {
      // Clean up old record for same student/date/slot/type to avoid duplicates
      const queryDate = new Date(date || record.date);
      queryDate.setHours(0, 0, 0, 0);

      const start = new Date(queryDate);
      const end = new Date(queryDate);
      end.setHours(23, 59, 59, 999);

      await Attendance.deleteMany({
        student: record.studentId,
        courseType: courseType || record.courseType,
        timeSlot: timeSlot || record.timeSlot,
        date: { $gte: start, $lte: end }
      });

      return new Attendance({
        student: record.studentId,
        courseType: courseType || record.courseType,
        timeSlot: timeSlot || record.timeSlot,
        date: date ? new Date(date) : (record.date ? new Date(record.date) : new Date()),
        status: record.status || 'absent',
        notes: record.notes || ''
      }).save();
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
    const { studentId, courseId, startDate, endDate, status, branch } = req.query;

    let filter = {};

    if (studentId) filter.student = studentId;
    if (courseId) filter.course = courseId;
    if (status) filter.status = status;
    if (branch) filter.branch = branch;

    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    const attendanceRecords = await Attendance.find(filter)
      .populate('student', 'name email phone')
      .populate('course', 'title description')
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
      .populate('student', 'name email phone')
      .populate('course', 'title description');

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
    ).populate('student', 'name email phone')
      .populate('course', 'title description');

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
      .populate('course', 'title description')
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

module.exports = {
  createAttendance,
  getAllAttendance,
  getAttendanceById,
  updateAttendance,
  deleteAttendance,
  getTodaysAttendance
};