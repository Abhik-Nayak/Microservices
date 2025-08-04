import express from 'express';
import { pool } from '../db.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const result = await pool.query('SELECT * FROM products');
  res.json(result.rows);
});

router.post('/add', async (req, res) => {
  const { name, price } = req.body;
  const result = await pool.query(
    'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *',
    [name, price]
  );
  res.status(201).json(result.rows[0]);
});

export default router;
