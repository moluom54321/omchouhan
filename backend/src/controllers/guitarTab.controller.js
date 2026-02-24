const GuitarTab = require('../models/GuitarTab');
const Admin = require('../models/Admin');
const path = require('path');
const fs = require('fs');

// Upload guitar tab/song
const uploadGuitarTab = async (req, res) => {
  try {
    const { songName, artist, tabContent, lyrics, chordsContent, defaultKey, category } = req.body;
    const userId = req.user.userId;

    const admin = await Admin.findById(userId);
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }

    let filePath = null;
    let fileType = 'text';

    if (req.file) {
      filePath = `/uploads/guitar-tabs/${req.file.filename}`;
      const ext = path.extname(req.file.originalname).toLowerCase();

      if (ext === '.pdf') {
        fileType = 'pdf';
      } else if (['.mp3', '.wav', '.ogg', '.m4a'].includes(ext)) {
        fileType = 'audio';
      } else {
        fileType = 'tab';
      }
    }

    const finalCategory = category || 'tabs';

    const guitarTab = new GuitarTab({
      songName,
      artist,
      tabContent: tabContent || '',
      lyrics: lyrics || '',
      chordsContent: chordsContent || '',
      defaultKey: defaultKey || 'C',
      filePath,
      fileType,
      category: finalCategory,
      creator: userId
    });

    await guitarTab.save();

    res.status(201).json({
      success: true,
      message: 'Guitar tab created successfully',
      data: guitarTab
    });
  } catch (error) {
    console.error('Upload guitar tab error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Get all guitar tabs
const getAllGuitarTabs = async (req, res) => {
  try {
    const { type, category } = req.query; // Query parameters to filter by type/category

    let query = {};
    if (category) {
      if (category === 'latest') {
        query = { category: 'latest' };
      } else if (category === 'popular') {
        query = { category: 'popular' };
      } else if (category === 'tabs') {
        query = { category: 'tabs' };
      }
    } else if (type) {
      // For backward compatibility
      if (type === 'latest') {
        query = { category: 'latest' };
      } else if (type === 'popular') {
        query = { category: 'popular' };
      } else if (type === 'tabs') {
        query = { category: 'tabs' };
      }
    }

    const guitarTabs = await GuitarTab.find(query)
      .populate('creator', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: guitarTabs
    });
  } catch (error) {
    console.error('Get guitar tabs error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Get latest songs
const getLatestSongs = async (req, res) => {
  try {
    const latestSongs = await GuitarTab.find({
      category: 'latest'
    })
      .populate('creator', 'name email')
      .sort({ createdAt: -1 })
      .limit(10); // Limit to 10 latest songs

    res.status(200).json({
      success: true,
      data: latestSongs
    });
  } catch (error) {
    console.error('Get latest songs error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Get popular tabs
const getPopularTabs = async (req, res) => {
  try {
    const popularTabs = await GuitarTab.find({
      category: 'popular'
    })
      .populate('creator', 'name email')
      .sort({ createdAt: -1 })
      .limit(10); // Limit to 10 popular tabs

    res.status(200).json({
      success: true,
      data: popularTabs
    });
  } catch (error) {
    console.error('Get popular tabs error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Get guitar tab by ID
const getGuitarTabById = async (req, res) => {
  try {
    const { id } = req.params;

    const guitarTab = await GuitarTab.findById(id)
      .populate('creator', 'name email');

    if (!guitarTab) {
      return res.status(404).json({
        success: false,
        message: 'Guitar tab not found'
      });
    }

    res.status(200).json({
      success: true,
      data: guitarTab
    });
  } catch (error) {
    console.error('Get guitar tab by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Update guitar tab
const updateGuitarTab = async (req, res) => {
  try {
    const { id } = req.params;
    const { songName, artist, tabContent, lyrics, chordsContent, defaultKey, category } = req.body;

    // Prepare update data
    const updateData = {
      songName,
      artist,
      tabContent,
      lyrics,
      chordsContent,
      defaultKey,
      category,
      updatedAt: Date.now()
    };

    // Handle file upload if present
    if (req.file) {
      // Delete old file if it exists
      const oldTab = await GuitarTab.findById(id);
      if (oldTab && oldTab.filePath) {
        const oldFilePath = path.join(__dirname, '../public', oldTab.filePath);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }

      // Set new file path
      updateData.filePath = `/uploads/guitar-tabs/${req.file.filename}`;

      // Set file type
      const ext = path.extname(req.file.originalname).toLowerCase();
      if (ext === '.pdf') {
        updateData.fileType = 'pdf';
      } else if (['.mp3', '.wav', '.ogg', '.m4a'].includes(ext)) {
        updateData.fileType = 'audio';
      } else {
        updateData.fileType = 'tab';
      }
    }

    const guitarTab = await GuitarTab.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!guitarTab) {
      return res.status(404).json({
        success: false,
        message: 'Guitar tab not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Guitar tab updated successfully',
      data: guitarTab
    });
  } catch (error) {
    console.error('Update guitar tab error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Delete guitar tab
const deleteGuitarTab = async (req, res) => {
  try {
    const { id } = req.params;

    const guitarTab = await GuitarTab.findByIdAndDelete(id);

    if (!guitarTab) {
      return res.status(404).json({
        success: false,
        message: 'Guitar tab not found'
      });
    }

    // Delete associated file if it exists
    if (guitarTab.filePath) {
      const fullPath = path.join(__dirname, '../public', guitarTab.filePath);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    }

    res.status(200).json({
      success: true,
      message: 'Guitar tab deleted successfully'
    });
  } catch (error) {
    console.error('Delete guitar tab error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};


// Get all tabs
const getAllTabs = async (req, res) => {
  try {
    const allTabs = await GuitarTab.find({
      category: 'tabs'
    })
      .populate('creator', 'name email')
      .sort({ createdAt: -1 })
      .limit(10); // Limit to 10 tabs

    res.status(200).json({
      success: true,
      data: allTabs
    });
  } catch (error) {
    console.error('Get all tabs error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

module.exports = {
  uploadGuitarTab,
  getAllGuitarTabs,
  getLatestSongs,
  getAllTabs,
  getPopularTabs,
  getGuitarTabById,
  updateGuitarTab,
  deleteGuitarTab
};