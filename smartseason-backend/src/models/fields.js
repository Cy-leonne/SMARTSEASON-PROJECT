const pool = require('../config/db');

const createField = async (name, cropType, plantingDate, stage, status, agentId) => {
  const result = await pool.query(
    'INSERT INTO fields (name, crop_type, planting_date, stage, status, agent_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [name, cropType, plantingDate, stage, status, agentId]
  );
  return result.rows[0];
};

const getAllFields = async () => {
  const result = await pool.query('SELECT * FROM fields ORDER BY created_at DESC');
  return result.rows;
};

const getFieldsByAgentId = async (agentId) => {
  const result = await pool.query('SELECT * FROM fields WHERE agent_id = $1 ORDER BY created_at DESC', [agentId]);
  return result.rows;
};

const getFieldById = async (id) => {
  const result = await pool.query('SELECT * FROM fields WHERE id = $1', [id]);
  return result.rows[0];
};

const updateField = async (id, name, cropType, stage, status) => {
  const result = await pool.query(
    'UPDATE fields SET name = $1, crop_type = $2, stage = $3, status = $4, updated_at = NOW() WHERE id = $5 RETURNING *',
    [name, cropType, stage, status, id]
  );
  return result.rows[0];
};

const deleteField = async (id) => {
  await pool.query('DELETE FROM fields WHERE id = $1', [id]);
};

module.exports = {
  createField,
  getAllFields,
  getFieldsByAgentId,
  getFieldById,
  updateField,
  deleteField,
};
