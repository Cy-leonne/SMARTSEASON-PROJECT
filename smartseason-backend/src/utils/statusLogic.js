const pool = require('../config/db');

const computeStatus = async (fieldId, currentStage) => {
  // Completed if harvested
  if (currentStage === 'Harvested') return 'Completed';

  // Get latest update timestamp
  const result = await pool.query(
    'SELECT timestamp FROM field_updates WHERE field_id=$1 ORDER BY timestamp DESC LIMIT 1',
    [fieldId]
  );

  if (result.rows.length === 0) {
    return 'At Risk'; // no updates yet
  }

  const lastUpdate = new Date(result.rows[0].timestamp);
  const now = new Date();
  const diffDays = Math.floor((now - lastUpdate) / (1000 * 60 * 60 * 24));

  if (diffDays > 14) {
    return 'At Risk';
  }

  return 'Active';
};

module.exports = { computeStatus };
