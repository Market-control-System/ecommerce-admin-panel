import express, { json } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import pluginRoutes from './routes/pluginRoutes.js';
import xmlRoutes from './routes/xmlRoutes.js';
import { configServer } from './inc/configService.js';
import { errorOperation } from './utils/errorOperation.js';
import cron from 'node-cron';
import axios from 'axios';

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
  cron.schedule('0 * * * *', async () => {
    console.log('Запуск задачи по созданию XML-файла каждый час');
    try {
      // Если вам нужно выполнить внутреннюю функцию сервера, вызовите её здесь
      // Например, если функция доступна как someInternalFunction()

      // Если вы хотите сделать HTTP-запрос к маршруту вашего API
      const response = await axios.get('https://seal-app-w3yo5.ondigitalocean.app/api/xml/create-xml-rozetka');
      console.log('Ответ от маршрута: ', response.data);
    } catch (error) {
      console.error('Ошибка при выполнении задачи: ', error.message);
    }
  });
});
