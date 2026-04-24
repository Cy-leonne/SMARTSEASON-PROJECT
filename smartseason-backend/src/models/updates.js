const pool = require('../config/db');

const createUpdate = async (fieldId, agentId, description, status) => {
  const result = await pool.query(
    'INSERT INTO field_updates (field_id, agent_id, description, status) VALUES ($1, $2, $3, $4) RETURNING *',
    [fieldId, agentId, description, status]
  );
  return result.rows[0];
};

const getUpdatesByFieldId = async (fieldId) => {
  const result = await pool.query(
    'SELECT * FROM field_updates WHERE field_id = $1 ORDER BY created_at DESC',
    [fieldId]
  );
  return result.rows;
};

const getUpdateById = async (id) => {
  const result = await pool.query('SELECT * FROM field_updates WHERE id = $1', [id]);
  return result.rows[0];
};

const updateUpdateStatus = async (id, status) => {
  const result = await pool.query(
    'UPDATE field_updates SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
    [status, id]
  );
  return result.rows[0];
};

const deleteUpdate = async (id) => {
  await pool.query('DELETE FROM field_updates WHERE id = $1', [id]);
};

module.exports = {
  createUpdate,
  getUpdatesByFieldId,
  getUpdateById,
  updateUpdateStatus,
  deleteUpdate,
};
