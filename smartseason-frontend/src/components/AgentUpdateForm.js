import React, { useState } from 'react';
import api from '../api';

function AgentUpdateForm({ fieldId, onUpdate }) {
  const [stage, setStage] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(`/updates/${fieldId}`, { stage, notes });
      alert('Update submitted successfully!');
      setStage('');
      setNotes('');
      if (onUpdate) onUpdate(res.data); // callback to refresh parent
    } catch (err) {
      console.error(err);
      alert('Failed to submit update');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>Log Update</h4>
      <label>
        Stage:
        <select value={stage} onChange={(e) => setStage(e.target.value)} required>
          <option value="">Select stage</option>
          <option value="Planted">Planted</option>
          <option value="Growing">Growing</option>
          <option value="Ready">Ready</option>
          <option value="Harvested">Harvested</option>
        </select>
      </label>
      <br />
      <label>
        Notes:
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
      </label>
      <br />
      <button type="submit">Submit Update</button>
    </form>
  );
}

export default AgentUpdateForm;
