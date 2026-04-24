const express = require('express');
const pool = require('../config/db');
const auth = require('../middleware/auth');
const { computeStatus } = require('../utils/statusLogic');
const router = express.Router();

// Admin: view all fields with status
router.get('/', auth(['admin']), async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM fields');
    const fields = await Promise.all(result.rows.map(async (field) => {
      const status = await computeStatus(field.id, field.current_stage);
      return { ...field, status };
    }));
    res.json(fields);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch fields' });
  }
});

// Agent: view assigned fields with status
router.get('/assigned', auth(['agent']), async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM fields WHERE agent_id=$1', [req.user.id]);
    const fields = await Promise.all(result.rows.map(async (field) => {
      const status = await computeStatus(field.id, field.current_stage);
      return { ...field, status };
    }));
    res.json(fields);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch assigned fields' });
  }
});

module.exports = router;
