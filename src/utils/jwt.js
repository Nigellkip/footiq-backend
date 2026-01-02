const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'footiq-junior-super-secret-2024-change-in-prod';
const JWT_EXPIRES_IN = '30d'; // Longer for youth apps

const jwtUtils = {
  // Generate token for user
  generateToken(user) {
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role || 'player',
      age: user.age
    };

    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN
    });
  },

  // Verify token
  verifyToken(token) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  },

  // Extract token from request
  extractToken(req) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.substring(7);
    }

    // Also check cookies for web frontend
    if (req.cookies && req.cookies.token) {
      return req.cookies.token;
    }

    return null;
  }
};

module.exports = jwtUtils;