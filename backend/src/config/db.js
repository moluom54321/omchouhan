const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const connectDB = async () => {
  try {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      tls: true,
      tlsAllowInvalidCertificates: true,
      retryWrites: true,
      w: 'majority'
      // No family: 4 here to allow IPv6 since ping showed IPv6 support
    };

    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/music_school_delhi', options);

    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Add connection event listeners for better error handling
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });

    // Reconnect if disconnected
    mongoose.connection.on('reconnected', () => {
      console.log('MongoDB reconnected');
    });

    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('\nMongoDB connection closed through app termination');
      process.exit(0);
    });

    return conn;
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);

    // Check for common IP whitelisting errors
    if (error.message.includes('MongooseServerSelectionError') ||
      error.message.includes('IP address') ||
      error.message.includes('whitelist') ||
      error.message.includes('ETIMEDOUT')) {
      console.log('\n' + '!'.repeat(70));
      console.log('CRITICAL: DATABASE CONNECTION BLOCKED BY IP WHITELIST');
      console.log('Your internet IP has likely changed and needs to be whitelisted in Atlas.');
      console.log('\nPERMANENT FIX STEPS:');
      console.log('1. Go to https://cloud.mongodb.com/');
      console.log('2. Network Access -> Add IP Address -> Allow Access From Anywhere (0.0.0.0/0)');
      console.log('\nSee detailed guide: ' + path.resolve(__dirname, '..', '..', '..', 'MONGODB_FIX_GUIDE.md'));
      console.log('!'.repeat(70) + '\n');
    }

    console.error('Error details:', {
      message: error.message,
      code: error.code,
      name: error.name
    });

    // Don't exit immediately, allow for retry if needed
    throw error;
  }
};

module.exports = connectDB;