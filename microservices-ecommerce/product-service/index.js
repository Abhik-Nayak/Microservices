import express from 'express';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js';

dotenv.config();
const app = express();
app.use(express.json());

app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Product service running on port ${PORT}`);
});
