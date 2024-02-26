/**
 * модель для работы с данными по курсам валют
 * - получение курса
 * - изменение курса
 */
import { executeQuery } from '../utils/dbQueries.js';

const getKurs = async () => {
    const DBName = 'prorab';
    const query = 'SELECT * FROM market_prodavec_info WHERE id_user = 65';

    try {
        const rows = await executeQuery(DBName, query, []);
        // console.log('KURS USD row - ', rows);
        return rows;
    } catch(err) {
        const error = new Error(err.message || `Internal server error`);
        error.debug = `Error catch in getKURS model / getKurs USD. stack err - ${err.stack}`;
        error.status = err.status || 500;
        throw(error);
    }
};

const modelKursUSD = {
    getKurs,
};

export default modelKursUSD;