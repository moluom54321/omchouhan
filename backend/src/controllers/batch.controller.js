const Batch = require('../models/Batch');

// Get all batches
exports.getBatches = async (req, res) => {
    try {
        const filter = {};
        if (req.query.branch) filter.branch = req.query.branch;
        if (req.query.status) filter.status = req.query.status;

        const batches = await Batch.find(filter).sort({ branch: 1, courseName: 1, order: 1 });

        res.status(200).json({
            success: true,
            data: batches
        });
    } catch (error) {
        console.error('Get batches error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Create new batch
exports.createBatch = async (req, res) => {
    try {
        const batch = new Batch(req.body);
        await batch.save();

        res.status(201).json({
            success: true,
            message: 'Batch created successfully',
            data: batch
        });
    } catch (error) {
        console.error('Create batch error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update batch
exports.updateBatch = async (req, res) => {
    try {
        const batch = await Batch.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!batch) {
            return res.status(404).json({
                success: false,
                message: 'Batch not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Batch updated successfully',
            data: batch
        });
    } catch (error) {
        console.error('Update batch error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Delete batch
exports.deleteBatch = async (req, res) => {
    try {
        const batch = await Batch.findByIdAndDelete(req.params.id);

        if (!batch) {
            return res.status(404).json({
                success: false,
                message: 'Batch not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Batch deleted successfully'
        });
    } catch (error) {
        console.error('Delete batch error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
