import { pool } from './database.js';

export const executeQuery = async (query, params) => {
  try {
    const [rows] = await pool.query(query, params);
    return rows;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;  
  }
};