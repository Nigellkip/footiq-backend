const jwtUtils = require('../utils/jwt');

const authMiddleware = {
  // Protect route - requires valid token
  protect: async (req, res, next) => {
    try {
      const token = jwtUtils.extractToken(req);
      
      if (!token) {
        return res.status(401).json({
          success: false,
          error: 'Authentication required. Please login.'
        });
      }

      const decoded = jwtUtils.verifyToken(token);
      req.user = decoded; // Attach user data to request
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        error: 'Invalid or expired session. Please login again.'
      });
    }
  },

  // Optional: Check if user is player (child)
  isPlayer: (req, res, next) => {
    if (req.user.role !== 'player') {
      return res.status(403).json({
        success: false,
        error: 'This feature is only for players'
      });
    }
    next();
  },

  // Optional: Check if user is parent/admin
  isParentOrAdmin: (req, res, next) => {
    if (!['parent', 'admin'].includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: 'Parent or admin access required'
      });
    }
    next();
  }
};

module.exports = authMiddleware;