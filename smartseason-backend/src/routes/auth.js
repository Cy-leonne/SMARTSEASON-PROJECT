const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail } = require('../models/users');
require('dotenv').config();

const router = express.Router();

router.post('/register/admin', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(name, email, hashedPassword, 'admin');
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: process.env.NODE_ENV === 'production' ? 'Admin registration failed' : err.message });
  }
});

router.post('/register/agent', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(name, email, hashedPassword, 'agent');
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: process.env.NODE_ENV === 'production' ? 'Agent registration failed' : err.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const user = await findUserByEmail(email);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: process.env.NODE_ENV === 'production' ? 'Login failed' : err.message });
  }
});

module.exports = router;
