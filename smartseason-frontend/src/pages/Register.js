import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [role, setRole] = useState('agent');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await api.post(`/auth/register/${role}`, { name, email, password });
      alert(`${role} registered successfully!`);
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Registration failed');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <label>
        Role:
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="agent">Agent</option>
          <option value="admin">Admin</option>
        </select>
      </label>
      <br />
      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}
