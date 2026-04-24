import React, { useState } from 'react';
import api from '../api';

const FieldTable = ({ fields, onUpdate }) => {
  const [editingField, setEditingField] = useState(null);
  const [formData, setFormData] = useState({});

  const handleEdit = (field) => {
    setEditingField(field.id);
    setFormData({
      name: field.name,
      crop_type: field.crop_type,
      stage: field.stage,
      status: field.status,
    });
  };

  const handleSave = async (fieldId) => {
    try {
      await api.put(`/fields/${fieldId}`, formData);
      setEditingField(null);
      onUpdate();
    } catch (error) {
      console.error('Error updating field:', error);
    }
  };

  const handleDelete = async (fieldId) => {
    if (window.confirm('Are you sure you want to delete this field?')) {
      try {
        await api.delete(`/fields/${fieldId}`);
        onUpdate();
      } catch (error) {
        console.error('Error deleting field:', error);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {fields.map((field) => (
          <li key={field.id}>
            <div className="px-4 py-4 sm:px-6">
              {editingField === field.id ? (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border rounded px-2 py-1"
                    placeholder="Field Name"
                  />
                  <input
                    type="text"
                    name="crop_type"
                    value={formData.crop_type}
                    onChange={handleChange}
                    className="border rounded px-2 py-1"
                    placeholder="Crop Type"
                  />
                  <select
                    name="stage"
                    value={formData.stage}
                    onChange={handleChange}
                    className="border rounded px-2 py-1"
                  >
                    <option value="PLANTED">Planted</option>
                    <option value="GROWING">Growing</option>
                    <option value="READY">Ready</option>
                    <option value="HARVESTED">Harvested</option>
                  </select>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="border rounded px-2 py-1"
                  >
                    <option value="ACTIVE">Active</option>
                    <option value="AT_RISK">At Risk</option>
                    <option value="COMPLETED">Completed</option>
                  </select>
                  <div className="col-span-4 flex gap-2">
                    <button
                      onClick={() => handleSave(field.id)}
                      className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingField(null)}
                      className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900">{field.name}</h3>
                    <p className="text-sm text-gray-500">Crop: {field.crop_type}</p>
                    <p className="text-sm text-gray-500">Stage: {field.stage}</p>
                    <p className="text-sm text-gray-500">Status: {field.status}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(field)}
                      className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(field.id)}
                      className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FieldTable;
