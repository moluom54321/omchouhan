const Content = require('../models/Content');

// Extract YouTube ID from URL
function extractYoutubeId(url) {
    if (!url) return '';

    // Clean the URL
    url = url.trim();

    // Regular expression to handle various YouTube URL formats
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);

    if (match && match[1]) {
        return match[1];
    }

    // Fallback: If it's already a plain video ID
    if (url.match(/^[a-zA-Z0-9_-]{11}$/)) {
        return url;
    }

    return '';
}

// Upload content
exports.uploadContent = async (req, res) => {
    try {
        const { type, title, youtubeUrl, description } = req.body;

        if (!type || !title || !youtubeUrl) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields: type, title, youtubeUrl'
            });
        }

        if (!['performance', 'shorts'].includes(type)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid type. Must be "performance" or "shorts"'
            });
        }

        const youtubeId = extractYoutubeId(youtubeUrl);
        if (!youtubeId) {
            return res.status(400).json({
                success: false,
                message: 'Invalid YouTube URL. Please use a valid YouTube link or video ID'
            });
        }

        // Get highest order for this type
        const lastContent = await Content.findOne({ type })
            .sort({ order: -1 })
            .select('order');

        const newContent = new Content({
            type,
            title,
            youtubeUrl,
            youtubeId,
            description,
            thumbnail: `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`, // Using mqdefault as it's more reliable than maxres
            order: (lastContent?.order || 0) + 1,
            createdBy: req.user.userId,
            isActive: true
        });

        const saved = await newContent.save();
        console.log(`✅ ${type} content added:`, saved._id);

        res.status(201).json({
            success: true,
            message: `${type} content uploaded successfully`,
            data: saved
        });
    } catch (error) {
        console.error('Upload content error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get all content by type
exports.getContentByType = async (req, res) => {
    try {
        const { type } = req.params;

        if (!['performance', 'shorts'].includes(type)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid type. Must be "performance" or "shorts"'
            });
        }

        const content = await Content.find({ type, isActive: true })
            .sort({ order: 1 })
            .populate('createdBy', 'email');

        res.status(200).json({
            success: true,
            data: content,
            count: content.length
        });
    } catch (error) {
        console.error('Get content error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get all content (admin)
exports.getAllContent = async (req, res) => {
    try {
        const content = await Content.find()
            .sort({ type: 1, order: 1 })
            .populate('createdBy', 'email');

        res.status(200).json({
            success: true,
            data: content,
            count: content.length
        });
    } catch (error) {
        console.error('Get all content error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get single content
exports.getContentById = async (req, res) => {
    try {
        const { id } = req.params;
        const content = await Content.findById(id).populate('createdBy', 'email');

        if (!content) {
            return res.status(404).json({
                success: false,
                message: 'Content not found'
            });
        }

        res.status(200).json({
            success: true,
            data: content
        });
    } catch (error) {
        console.error('Get content error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update content
exports.updateContent = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, youtubeUrl, description, isActive } = req.body;

        let updateData = { title, description, isActive };

        // If URL changed, extract new ID
        if (youtubeUrl) {
            const youtubeId = extractYoutubeId(youtubeUrl);
            if (!youtubeId) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid YouTube URL'
                });
            }
            updateData.youtubeUrl = youtubeUrl;
            updateData.youtubeId = youtubeId;
            updateData.thumbnail = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
        }

        const updated = await Content.findByIdAndUpdate(id, updateData, { new: true });

        if (!updated) {
            return res.status(404).json({
                success: false,
                message: 'Content not found'
            });
        }

        console.log(`✅ Content updated:`, id);

        res.status(200).json({
            success: true,
            message: 'Content updated successfully',
            data: updated
        });
    } catch (error) {
        console.error('Update content error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Delete content
exports.deleteContent = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await Content.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: 'Content not found'
            });
        }

        console.log(`✅ Content deleted:`, id);

        res.status(200).json({
            success: true,
            message: 'Content deleted successfully'
        });
    } catch (error) {
        console.error('Delete content error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Reorder content
exports.reorderContent = async (req, res) => {
    try {
        const { contentIds } = req.body;

        for (let i = 0; i < contentIds.length; i++) {
            await Content.findByIdAndUpdate(contentIds[i], { order: i });
        }

        console.log('✅ Content reordered');

        res.status(200).json({
            success: true,
            message: 'Content reordered successfully'
        });
    } catch (error) {
        console.error('Reorder content error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
