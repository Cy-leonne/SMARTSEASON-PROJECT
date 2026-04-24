const express = require('express');
const pool = require('../config/db');
const auth = require('../middleware/auth');
const { computeStatus } = require('../utils/statusLogic');
const router = express.Router();

// Admin: dashboard summary
router.get('/', auth(['admin']), async (req, res) => {
  try {
    // Get all fields
    const result = await pool.query('SELECT * FROM fields');
    const fields = await Promise.all(result.rows.map(async (field) => {
      const status = await computeStatus(field.id, field.current_stage);
      return { ...field, status };
    }));

    // Total fields
    const totalFields = fields.length;

    // Status breakdown
    const statusCounts = fields.reduce((acc, field) => {
      acc[field.status] = (acc[field.status] || 0) + 1;
      return acc;
    }, {});

    // Insights (example: most common crop type)
    const cropCounts = fields.reduce((acc, field) => {
      acc[field.crop_type] = (acc[field.crop_type] || 0) + 1;
      return acc;
    }, {});
    const mostCommonCrop = Object.entries(cropCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || null;

    res.json({
      totalFields,
      statusBreakdown: statusCounts,
      mostCommonCrop,
      fields
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

module.exports = router;
