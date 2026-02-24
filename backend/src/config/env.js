// Environment configuration
require('dotenv').config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/music_school_delhi',
  JWT_SECRET: process.env.JWT_SECRET || 'music_school_delhi_secret_key',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '7d', // 7 days
  BCRYPT_ROUNDS: parseInt(process.env.BCRYPT_ROUNDS) || 12,
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000',
  // Email Configuration (Gmail)
  GMAIL_USER: process.env.GMAIL_USER || 'your-email@gmail.com',
  GMAIL_PASSWORD: process.env.GMAIL_PASSWORD || 'your-app-password',
};