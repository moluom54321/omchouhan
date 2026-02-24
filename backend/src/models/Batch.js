const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema({
    branch: {
        type: String,
        enum: ['Pitampura', 'Rohini'],
        required: [true, 'Branch is required']
    },
    courseName: {
        type: String,
        required: [true, 'Course name is required'],
        trim: true
    },
    days: {
        type: String,
        required: [true, 'Days (e.g. Mon & Fri) are required'],
        trim: true
    },
    timeSlot: {
        type: String,
        required: [true, 'Time slot (e.g. 4-5 PM) is required'],
        trim: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    hideFromAdmission: {
        type: Boolean,
        default: false
    },
    order: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Virtual for the combined identity string used in system logic
batchSchema.virtual('batchKey').get(function () {
    // Format: Branch_Course_Days_Time
    const cleanCourse = this.courseName.replace(/\s+/g, '');
    const cleanDays = this.days.replace(/\s*[&/]\s*/g, '').replace(/\s+/g, '');
    return `${this.branch}_${cleanCourse}_${cleanDays}_${this.timeSlot.replace(/\s+/g, '')}`;
});

module.exports = mongoose.model('Batch', batchSchema);
