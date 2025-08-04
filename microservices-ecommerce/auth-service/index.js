require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const app = express();
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: 'localhost',
  port: 5432,
  database: process.env.DB_NAME,
});

app.get('/', async (req, res) => {
  const result = await pool.query('SELECT NOW()');
  res.json({ time: result.rows[0] });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Auth service running on port ${PORT}`);
});
