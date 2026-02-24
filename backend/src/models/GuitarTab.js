const mongoose = require('mongoose');

const guitarTabSchema = new mongoose.Schema({
  songName: {
    type: String,
    required: true,
    trim: true
  },
  artist: {
    type: String,
    required: true,
    trim: true
  },
  tabContent: {
    type: String,
    default: ''
  },
  lyrics: {
    type: String,
    default: ''
  },
  chordsContent: {
    type: String,
    default: ''
  },
  defaultKey: {
    type: String,
    default: 'C'
  },
  filePath: {
    type: String, // Path to uploaded file (audio/pdf/tab)
    default: null
  },
  fileType: {
    type: String, // 'audio', 'pdf', 'tab', etc.
    enum: ['audio', 'pdf', 'tab', 'text'],
    default: 'text'
  },
  category: {
    type: String,
    enum: ['latest', 'popular', 'tabs'],
    default: 'tabs'
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin', // Reference to admin who created it
    required: true
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

module.exports = mongoose.model('GuitarTab', guitarTabSchema);