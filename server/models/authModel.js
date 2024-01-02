// Здесь логика подключения к MySQL и проверки пользователя
import {pool} from '../utils/database.js';

// авторизация -  проверка наличия логина/ соответствие пароля
const authenticate = async (username, password) => {
  console.log('Model  pass - ', password, ' name  - ', username);

  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE phoneNumber = ?', [username]);
    console.log('result query to DB - ', rows);
  } catch (error) {
    console.log('error DB query');
  }


   // test query to DB
  //try { 
  //  const [rows] = await pool.query('SELECT NOW()');
  //  console.log('Current time is:', rows[0]['NOW()']);
  //} catch (error) {
  //  console.error('Error during DB connection test:', error);
  //}



  
  //return rows[0];  
  // Используйте библиотеку, например, mysql2 или sequelize
  // Проверьте, что хеш пароля в БД соответствует введенному паролю
  return true;
};

export default {
  authenticate,
};
