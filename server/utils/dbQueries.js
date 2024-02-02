import { poolDBPanel, poolDBMotoservice, poolDBProfitools } from './database.js';

const pools = {
    panel: poolDBPanel,
    profitools: poolDBProfitools,
    motoservice: poolDBMotoservice
};

export const executeQuery = async (dbName = 'panel', query, params) => {
    const pool = pools[dbName];
    if (!pool) {
        throw new Error(`Database pool for '${dbName}' not found.`);
    }

    try {
        const [rows] = await pool.query(query, params);
        return rows;
    } catch (error) {
        console.error(`Error executing query on '${dbName}':`, error);
        // Обработка ошибки подключения
        if (error.code === 'ECONNREFUSED') {
          // Код для обработки ошибки подключения:
          console.error(`Database '${dbName}' is not accessible.`);
          // добавить логику переподключения или возврата специфической ошибки
        }
        throw error;  
    }
};