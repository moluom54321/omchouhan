const Announcement = require('../models/Announcement');

// Create announcement
const createAnnouncement = async (req, res) => {
    try {
        const { title, message, type, targetRole, targetStudents } = req.body;
        const announcement = new Announcement({
            title,
            message,
            type,
            targetRole,
            targetStudents: targetStudents || [],
            createdBy: req.user.userId
        });
        await announcement.save();
        res.status(201).json({ success: true, data: announcement });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all announcements
const getAnnouncements = async (req, res) => {
    try {
        let query = { active: true };

        // If user is student, they see 'all' announcements OR those targeted to them
        if (req.user && req.user.role === 'student') {
            query = {
                active: true,
                $or: [
                    { targetRole: 'all' },
                    { targetStudents: req.user.userId }
                ]
            };
        }

        const announcements = await Announcement.find(query).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: announcements });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete announcement
const deleteAnnouncement = async (req, res) => {
    try {
        const announcement = await Announcement.findByIdAndUpdate(req.params.id, { active: false }, { new: true });
        if (!announcement) return res.status(404).json({ success: false, message: 'Not found' });
        res.status(200).json({ success: true, message: 'Announcement removed' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    createAnnouncement,
    getAnnouncements,
    deleteAnnouncement
};
