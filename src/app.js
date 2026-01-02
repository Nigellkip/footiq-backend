const express = require('express');
const cors = require('cors');
const drillRoutes = require('./routes/drill.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/drills', drillRoutes);
app.use('/api/auth', authRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'FootIQ Junior API',
    timestamp: new Date().toISOString()
  });
});

// Welcome
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to FootIQ Junior API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      drills: '/api/drills',
      auth: '/api/auth'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

module.exports = app;