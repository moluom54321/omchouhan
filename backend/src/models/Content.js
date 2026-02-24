const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: ['performance', 'shorts'],
            required: true
        },
        title: {
            type: String,
            required: true,
            trim: true
        },
        youtubeUrl: {
            type: String,
            required: true,
            trim: true
        },
        youtubeId: {
            type: String,
            required: true
        },
        description: {
            type: String,
            trim: true
        },
        thumbnail: {
            type: String
        },
        order: {
            type: Number,
            default: 0
        },
        isActive: {
            type: Boolean,
            default: true
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Admin'
        }
    },
    { 
        timestamps: true 
    }
);

// Index for faster queries
contentSchema.index({ type: 1, isActive: 1, order: 1 });

module.exports = mongoose.model('Content', contentSchema);
