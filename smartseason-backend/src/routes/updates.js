const express = require('express');
const pool = require('../config/db');
const auth = require('../middleware/auth');
const router = express.Router();

// Agent: add update for a field
router.post('/:fieldId', auth(['agent']), async (req, res) => {
  const { fieldId } = req.params;
  const { stage, notes } = req.body;

  try {
    // Insert into field_updates
    const updateResult = await pool.query(
      'INSERT INTO field_updates (field_id, agent_id, stage, notes) VALUES ($1, $2, $3, $4) RETURNING *',
      [fieldId, req.user.id, stage, notes]
    );

    // Update current_stage in fields table
    await pool.query(
      'UPDATE fields SET current_stage=$1 WHERE id=$2',
      [stage, fieldId]
    );

    res.json(updateResult.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add update' });
  }
});

// Admin: view all updates
router.get('/', auth(['admin']), async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT fu.*, f.name AS field_name, u.name AS agent_name
       FROM field_updates fu
       JOIN fields f ON fu.field_id = f.id
       JOIN users u ON fu.agent_id = u.id
       ORDER BY fu.timestamp DESC`
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch updates' });
  }
});

// Agent: view updates for their assigned fields
router.get('/my', auth(['agent']), async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT fu.*, f.name AS field_name
       FROM field_updates fu
       JOIN fields f ON fu.field_id = f.id
       WHERE fu.agent_id=$1
       ORDER BY fu.timestamp DESC`,
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch agent updates' });
  }
});

module.exports = router;
