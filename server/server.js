import express, { json } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import pluginRoutes from './routes/pluginRoutes.js';
import xmlRoutes from './routes/xmlRoutes.js';
import { configServer } from './inc/configService.js';
import { errorOperation } from './utils/errorOperation.js';

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(json()); 
app.use(express.urlencoded({ extended: true }));

// Подключение маршрутов
app.use('/api/auth', authRoutes);
app.use('/api/product', productRoutes);
app.use('/api/plugin', pluginRoutes);
app.use('/api/xml', xmlRoutes);

app.use(errorOperation);

const PORT = configServer.port || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}  IP - ${process.env.DB_HOST}`);
});
