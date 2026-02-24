const Settings = require('../models/Settings');

// Get site settings
exports.getSettings = async (req, res) => {
    try {
        let settings = await Settings.findOne();

        // If no settings exist, create default
        if (!settings) {
            settings = new Settings();
            await settings.save();
        }

        res.status(200).json({
            success: true,
            data: settings
        });
    } catch (error) {
        console.error('Get settings error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update site settings
exports.updateSettings = async (req, res) => {
    try {
        const { stats } = req.body;

        let settings = await Settings.findOne();

        if (!settings) {
            settings = new Settings();
        }

        if (stats) {
            settings.stats = {
                ...settings.stats,
                ...stats
            };
        }

        settings.updatedBy = req.user.userId;

        const saved = await settings.save();

        res.status(200).json({
            success: true,
            message: 'Settings updated successfully',
            data: saved
        });
    } catch (error) {
        console.error('Update settings error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
