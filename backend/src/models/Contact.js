const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true,
        maxlength: [100, 'Name cannot exceed 100 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
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
        trim: true
    },
    subject: {
        type: String,
        enum: ['general', 'admission', 'courses', 'feedback', 'other'],
        required: [true, 'Subject is required']
    },
    message: {
        type: String,
        required: [true, 'Message is required'],
        trim: true,
        maxlength: [2000, 'Message cannot exceed 2000 characters']
    },
    status: {
        type: String,
        enum: ['new', 'read', 'replied'],
        default: 'new'
    },
    adminReply: {
        message: {
            type: String,
            default: ''
        },
        repliedBy: {
            type: String,
            default: ''
        },
        repliedAt: {
            type: Date,
            default: null
        }
    },
    replyEmailSent: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt field before saving
contactSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Contact', contactSchema);
