const pool = require('../config/database');
const bcrypt = require('bcryptjs');

const User = {
  // Create new user
  async create({ username, email, password, age, parentEmail, role = 'player' }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const { rows } = await pool.query(
      `INSERT INTO users (username, email, password_hash, age, parent_email, role)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, username, email, age, role, parent_email, created_at`,
      [username, email, hashedPassword, age, parentEmail, role]
    );
    return rows[0];
  },

  // Find user by email
  async findByEmail(email) {
    const { rows } = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return rows[0];
  },

  // Find user by ID
  async findById(id) {
    const { rows } = await pool.query(
      `SELECT id, username, email, age, role, parent_email, created_at 
       FROM users WHERE id = $1`,
      [id]
    );
    return rows[0];
  },

  // Validate password
  async validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  },

  // Update user progress stats
  async updateStats(userId, stats) {
    // Could add stats tracking here
    return { success: true };
  }
};

module.exports = User;