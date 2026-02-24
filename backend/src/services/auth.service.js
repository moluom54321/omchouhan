const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/env');

// Hash password
const hashPassword = async (password) => {
  const saltRounds = config.BCRYPT_ROUNDS;
  return await bcrypt.hash(password, saltRounds);
};

// Compare password
const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

// Generate JWT token
const generateToken = (userId, role, email) => {
  const payload = {
    userId,
    role,
    email: email || null // include email in token if provided
  };
  
  return jwt.sign(
    payload,
    config.JWT_SECRET,
    { expiresIn: config.JWT_EXPIRE }
  );
};

// Verify JWT token
const verifyToken = (token) => {
  return jwt.verify(token, config.JWT_SECRET);
};

module.exports = {
  hashPassword,
  comparePassword,
  generateToken,
  verifyToken,
};