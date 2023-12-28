import express, { json } from 'express';
import authRoutes from './routes/authRoutes.js';

const app = express();

app.use(json()); 

// Подключение маршрутов
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
