const User = require('../models/User');
const jwtUtils = require('../utils/jwt');

const authController = {
  // Register new player (child)
  async register(req, res) {
    try {
      const { username, email, password, age, parentEmail } = req.body;

      // Validation
      if (!username || !email || !password || !age || !parentEmail) {
        return res.status(400).json({
          success: false,
          error: 'All fields are required'
        });
      }

      if (age > 12) {
        return res.status(400).json({
          success: false,
          error: 'Players must be 12 years or younger'
        });
      }

      // Check if email exists
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({
          success: false,
          error: 'Email already registered'
        });
      }

      // Create user
      const user = await User.create({
        username,
        email,
        password,
        age,
        parentEmail,
        role: 'player'
      });

      // Generate token
      const token = jwtUtils.generateToken(user);

      res.status(201).json({
        success: true,
        message: 'Registration successful! Welcome to FootIQ Junior!',
        data: {
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            age: user.age,
            role: user.role
          },
          token
        }
      });

    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({
        success: false,
        error: 'Registration failed. Please try again.'
      });
    }
  },

  // Login
  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          error: 'Email and password required'
        });
      }

      // Find user
      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(401).json({
          success: false,
          error: 'Invalid email or password'
        });
      }

      // Validate password
      const isValidPassword = await User.validatePassword(password, user.password_hash);
      if (!isValidPassword) {
        return res.status(401).json({
          success: false,
          error: 'Invalid email or password'
        });
      }

      // Generate token
      const token = jwtUtils.generateToken(user);

      res.json({
        success: true,
        message: 'Login successful!',
        data: {
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            age: user.age,
            role: user.role
          },
          token
        }
      });

    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        success: false,
        error: 'Login failed. Please try again.'
      });
    }
  },

  // Get current user profile
  async getProfile(req, res) {
    try {
      const user = await User.findById(req.user.id);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found'
        });
      }

      res.json({
        success: true,
        data: user
      });
    } catch (error) {
      console.error('Profile error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to load profile'
      });
    }
  }
};

module.exports = authController;