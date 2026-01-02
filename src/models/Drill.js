const pool = require('../config/database');

const Drill = {
  async findAll() {
    const { rows } = await pool.query(
      `SELECT id, slug, title, description, category, 
              difficulty, duration_minutes, video_url, 
              audio_url, steps, created_at
       FROM drills ORDER BY id`
    );
    return rows;
  },

  async findBySlug(slug) {
    const { rows } = await pool.query(
      `SELECT id, slug, title, description, category,
              difficulty, duration_minutes, video_url,
              audio_url, steps, created_at
       FROM drills WHERE slug = $1`,
      [slug]
    );
    return rows[0];
  },

  async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM drills WHERE id = $1',
      [id]
    );
    return rows[0];
  },

  async create(drillData) {
    const { slug, title, description, category, difficulty, 
            duration_minutes, video_url, audio_url, steps } = drillData;
    
    const { rows } = await pool.query(
      `INSERT INTO drills 
       (slug, title, description, category, difficulty, 
        duration_minutes, video_url, audio_url, steps)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [slug, title, description, category, difficulty,
       duration_minutes || 10, video_url, audio_url, JSON.stringify(steps)]
    );
    return rows[0];
  }
};

module.exports = Drill;