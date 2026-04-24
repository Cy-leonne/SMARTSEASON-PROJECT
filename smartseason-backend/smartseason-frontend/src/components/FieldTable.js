import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import api from '../api';

const FieldTable = ({ fields, onUpdate, isAgent = false }) => {
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
      toast.success('Field updated successfully');
      setEditingField(null);
      onUpdate?.();
    } catch (error) {
      toast.error('Failed to update field');
      console.error('Error updating field:', error);
    }
  };

  const handleDelete = async (fieldId) => {
    if (!window.confirm('Are you sure you want to delete this field? This action cannot be undone.')) return;

    try {
      await api.delete(`/fields/${fieldId}`);
      toast.success('Field deleted successfully');
      onUpdate?.();
    } catch (error) {
      toast.error('Failed to delete field');
      console.error('Error deleting field:', error);
    }
  };

  const handleCancel = () => {
    setEditingField(null);
    setFormData({});
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return { background: '#dcfce7', color: '#166534' };
      case 'at_risk':
        return { background: '#fee2e2', color: '#991b1b' };
      case 'completed':
        return { background: '#dbeafe', color: '#1e40af' };
      default:
        return { background: '#f3f4f6', color: '#374151' };
    }
  };

  const getStageColor = (stage) => {
    switch (stage?.toLowerCase()) {
      case 'planted':
        return { background: '#fef3c7', color: '#92400e' };
      case 'growing':
        return { background: '#dcfce7', color: '#166534' };
      case 'ready':
        return { background: '#fed7aa', color: '#9a3412' };
      case 'harvested':
        return { background: '#e9d5ff', color: '#6b21a8' };
      default:
        return { background: '#f3f4f6', color: '#374151' };
    }
  };

  if (fields.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '3rem 1rem',
        color: '#6b7280'
      }}>
        <svg style={{ width: '3rem', height: '3rem', margin: '0 auto 1rem', color: '#d1d5db' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
          No fields found
        </h3>
        <p style={{ color: '#6b7280' }}>
          {isAgent ? 'No fields are currently assigned to you.' : 'No fields have been created yet.'}
        </p>
      </div>
    );
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{
        minWidth: '100%',
        borderCollapse: 'collapse',
        borderSpacing: '0'
      }}>
        <thead style={{ background: '#f9fafb' }}>
          <tr>
            <th style={{
              padding: '0.75rem 1.5rem',
              textAlign: 'left',
              fontSize: '0.75rem',
              fontWeight: '600',
              color: '#6b7280',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              borderBottom: '1px solid #e5e7eb'
            }}>
              Field Details
            </th>
            <th style={{
              padding: '0.75rem 1.5rem',
              textAlign: 'left',
              fontSize: '0.75rem',
              fontWeight: '600',
              color: '#6b7280',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              borderBottom: '1px solid #e5e7eb'
            }}>
              Crop & Stage
            </th>
            <th style={{
              padding: '0.75rem 1.5rem',
              textAlign: 'left',
              fontSize: '0.75rem',
              fontWeight: '600',
              color: '#6b7280',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              borderBottom: '1px solid #e5e7eb'
            }}>
              Status
            </th>
            {!isAgent && (
              <th style={{
                padding: '0.75rem 1.5rem',
                textAlign: 'left',
                fontSize: '0.75rem',
                fontWeight: '600',
                color: '#6b7280',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                borderBottom: '1px solid #e5e7eb'
              }}>
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody style={{ background: 'white' }}>
          {fields.map((field) => (
            <tr key={field.id} style={{
              borderBottom: '1px solid #e5e7eb',
              transition: 'background-color 0.15s ease-in-out'
            }}
            onMouseEnter={(e) => e.target.closest('tr').style.background = '#f9fafb'}
            onMouseLeave={(e) => e.target.closest('tr').style.background = 'white'}
            >
              <td style={{
                padding: '1rem 1.5rem',
                whiteSpace: 'nowrap'
              }}>
                {editingField === field.id ? (
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.25rem 0.5rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.25rem',
                      fontSize: '0.875rem'
                    }}
                    placeholder="Field name"
                  />
                ) : (
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#111827' }}>{field.name}</div>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>ID: {field.id}</div>
                  </div>
                )}
              </td>

              <td style={{
                padding: '1rem 1.5rem',
                whiteSpace: 'nowrap'
              }}>
                {editingField === field.id ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <input
                      name="crop_type"
                      value={formData.crop_type}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '0.25rem 0.5rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.25rem',
                        fontSize: '0.875rem'
                      }}
                      placeholder="Crop type"
                    />
                    <select
                      name="stage"
                      value={formData.stage}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '0.25rem 0.5rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.25rem',
                        fontSize: '0.875rem'
                      }}
                    >
                      <option value="PLANTED">Planted</option>
                      <option value="GROWING">Growing</option>
                      <option value="READY">Ready</option>
                      <option value="HARVESTED">Harvested</option>
                    </select>
                  </div>
                ) : (
                  <div>
                    <div style={{ fontSize: '0.875rem', color: '#111827' }}>{field.crop_type}</div>
                    <span style={{
                      display: 'inline-flex',
                      padding: '0.125rem 0.5rem',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      borderRadius: '9999px',
                      ...getStageColor(field.stage)
                    }}>
                      {field.stage}
                    </span>
                  </div>
                )}
              </td>

              <td style={{
                padding: '1rem 1.5rem',
                whiteSpace: 'nowrap'
              }}>
                {editingField === field.id ? (
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.25rem 0.5rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.25rem',
                      fontSize: '0.875rem'
                    }}
                  >
                    <option value="ACTIVE">Active</option>
                    <option value="AT_RISK">At Risk</option>
                    <option value="COMPLETED">Completed</option>
                  </select>
                ) : (
                  <span style={{
                    display: 'inline-flex',
                    padding: '0.125rem 0.5rem',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    borderRadius: '9999px',
                    ...getStatusColor(field.status)
                  }}>
                    {field.status}
                  </span>
                )}
              </td>

              {!isAgent && (
                <td style={{
                  padding: '1rem 1.5rem',
                  whiteSpace: 'nowrap',
                  fontSize: '0.875rem',
                  fontWeight: '500'
                }}>
                  {editingField === field.id ? (
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => handleSave(field.id)}
                        style={{
                          color: '#16a34a',
                          background: '#f0fdf4',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '0.25rem',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '0.875rem'
                        }}
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        style={{
                          color: '#6b7280',
                          background: '#f9fafb',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '0.25rem',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '0.875rem'
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => handleEdit(field)}
                        style={{
                          color: '#4f46e5',
                          background: '#eef2ff',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '0.25rem',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '0.875rem'
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(field.id)}
                        style={{
                          color: '#dc2626',
                          background: '#fef2f2',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '0.25rem',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '0.875rem'
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FieldTable;
