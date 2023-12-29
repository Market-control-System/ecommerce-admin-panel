import { createPool } from 'mysql2/promise';
import {configDBPr} from '../inc/configService.js';

// Настройте подключение к MySQL
const pool = createPool(configDBPr);

export default pool;
