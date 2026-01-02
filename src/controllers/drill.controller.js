const Drill = require('../models/Drill');

const drillController = {
  // GET all drills
  async getAllDrills(req, res) {
    try {
      const drills = await Drill.findAll();
      
      res.json({
        success: true,
        count: drills.length,
        data: drills
      });
    } catch (error) {
      console.error('Get drills error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch drills'
      });
    }
  },

  // GET single drill by slug
  async getDrillBySlug(req, res) {
    try {
      const { slug } = req.params;
      const drill = await Drill.findBySlug(slug);

      if (!drill) {
        return res.status(404).json({
          success: false,
          error: 'Drill not found'
        });
      }

      res.json({
        success: true,
        data: drill
      });
    } catch (error) {
      console.error('Get drill error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch drill'
      });
    }
  },

  // POST create new drill (protected route for later)
  async createDrill(req, res) {
    try {
      const drill = await Drill.create(req.body);
      
      res.status(201).json({
        success: true,
        data: drill
      });
    } catch (error) {
      console.error('Create drill error:', error);
      res.status(400).json({
        success: false,
        error: 'Failed to create drill'
      });
    }
  }
};

module.exports = drillController;