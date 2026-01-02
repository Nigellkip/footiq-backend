const express = require('express');
const router = express.Router();
const drillController = require('../controllers/drill.controller');

// Public routes
router.get('/', drillController.getAllDrills);
router.get('/:slug', drillController.getDrillBySlug);

// TODO: Add auth middleware for protected routes
// router.post('/', authenticate, drillController.createDrill);

module.exports = router;