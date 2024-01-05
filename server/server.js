import express, { json } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import 'dotenv/config';

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(json()); 
app.use(express.urlencoded({ extended: true }));

// Подключение маршрутов
app.use('/api/auth', authRoutes);
app.use('/api/product', productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}  IP - ${process.env.DB_HOST}`);
});
