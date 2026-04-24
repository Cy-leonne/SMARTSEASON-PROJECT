const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
const fieldRoutes = require('./routes/fields');
const dashboardRoutes = require('./routes/dashboard');
const updateRoutes = require('./routes/updates');

if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET is not defined. Set it in your .env file.');
  process.exit(1);
}

app.use('/updates', updateRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/auth', authRoutes);
app.use('/fields', fieldRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
