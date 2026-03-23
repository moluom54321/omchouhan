const mongoose = require('mongoose');

const admissionSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true,
        maxlength: [100, 'Name cannot exceed 100 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Please enter a valid email'
        ]
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        match: [/^\d{10}$/, 'Phone number must be exactly 10 digits']
    },
    dateOfBirth: {
        type: Date,
        required: [true, 'Date of birth is required']
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        default: null
    },
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        pincode: {
            type: String,
            required: true,
            match: [/^\d{6}$/, 'Pincode must be exactly 6 digits']
        }
    },
    course: {
        type: [String],
        required: [true, 'At least one course is required'],
        validate: [v => Array.isArray(v) && v.length > 0, 'At least one course must be selected']
    },
    preferredSchedule: {
        type: [String],
        required: [true, 'At least one schedule slot is required'],
        validate: [v => Array.isArray(v) && v.length > 0, 'At least one schedule slot must be selected']
    },
    guardianDetails: {
        name: { type: String },
        phone: { type: String },
        email: { type: String },
        relation: { type: String }
    },
    admissionStatus: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    paymentStatus: {
        type: String,
        enum: ['unpaid', 'paid', 'refunded'],
        default: 'unpaid'
    },
    enrollmentStatus: {
        type: String,
        enum: ['not_enrolled', 'enrolled', 'completed'],
        default: 'not_enrolled'
    },
    transactionId: {
        type: String,
        default: null
    },
    whatsappScreenshotSent: {
        type: Boolean,
        default: false
    },
    isCashPayment: {
        type: Boolean,
        default: false
    },
    branch: {
        type: String,
        default: 'Pitampura'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Admission', admissionSchema);