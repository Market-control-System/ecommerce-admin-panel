// Здесь логика подключения к MySQL и проверки пользователя
import { executeQuery } from '../utils/dbQueries.js';
import { comparePassword, generatePasswordHash } from '../utils/passwordWork.js';

// авторизация -  проверка наличия логина/ соответствие пароля
const authenticate = async (phoneNumber, passwordText) => {
  const result = {
    err: true,
    msg: null,
    data: {},
  }; 

  const query = 'SELECT * FROM users WHERE phoneNumber = ?';

  try {
    const rows = await executeQuery('panel', query, [phoneNumber]);

    if (rows.length === 0 ) {
      result.err = true;
      result.data = {};
      result.msg = `Not found user with phone number ${phoneNumber}`;
      return result;
    }

    const user = rows[0];

    if (!await comparePassword(passwordText, user.password)) {
      result.err = true;
      result.data = {};
      result.msg = 'Password not correct!';
      return result;
    }

    const { id, role, userName, dateCreate, dateUpdate, block } = user;
    result.err = false;
    result.msg = '';
    result.data = { id, role, userName, dateCreate, dateUpdate, block };

    
    //console.log('result query to DB - ', rows);
    return result;

  } catch (error) {
    result.err = true;
    result.data = {};
    result.msg = `Error DB query - ${query}. Error msg - ${error}`;
    return result;
  }


   // test query to DB
  //try { 
  //  const [rows] = await pool.query('SELECT NOW()');
  //  console.log('Current time is:', rows[0]['NOW()']);
  //} catch (error) {
  //  console.error('Error during DB connection test:', error);
  //}
};

const createUSer = async (password)=> {
 
  const hash = await generatePasswordHash(password);
  console.log('Hashed password:', hash);

};

export default {
  authenticate,
  createUSer,
};
