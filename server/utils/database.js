import { createPool } from 'mysql2/promise';

// Настройте подключение к MySQL
const pool = createPool({ /* параметры подключения */ });

export default pool;
