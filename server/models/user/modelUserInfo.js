/**
 * модель запросов к БД
 * для получения разного плана инфы о пользователе
 */
import { executeQuery } from '../../utils/dbQueries.js';

const findUserByLogin = async (login) => {
    const DBName = 'panel';
    const query = 'SELECT * FROM users WHERE phoneNumber = ?';

    try {
        const rows = await executeQuery(DBName, query, [login]);

        return rows;
    } catch(err) {
        const error = new Error(err.message || `Internal server error`);
        error.debug = `Error catch in modelUserInfo / findUserByLogin. stack err - ${err.stack}`;
        error.status = err.status || 500;
    }
};


const modelUserInfo = {
    findUserByLogin,
};

export default modelUserInfo;