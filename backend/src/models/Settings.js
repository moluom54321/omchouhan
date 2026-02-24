const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema(
    {
        stats: {
            studentsTrained: {
                value: { type: String, default: '5,000+' },
                label: { type: String, default: 'Students Trained' }
            },
            yearsExperience: {
                value: { type: String, default: '10+' },
                label: { type: String, default: 'Years Experience' }
            },
            expertInstructors: {
                value: { type: String, default: '50+' },
                label: { type: String, default: 'Expert Instructors' }
            },
            satisfactionRate: {
                value: { type: String, default: '100%' },
                label: { type: String, default: 'Satisfaction Rate' }
            }
        },
        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Admin'
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Settings', settingsSchema);
