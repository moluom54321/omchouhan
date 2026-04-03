const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    message: {
        type: String,
        required: [true, 'Message is required']
    },
    type: {
        type: String,
        enum: ['general', 'fees', 'exam', 'holiday', 'attendance'],
        default: 'general'
    },
    targetRole: {
        type: String,
        enum: ['all', 'student'],
        default: 'all'
    },
    targetStudents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    },
    active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Announcement', announcementSchema);
