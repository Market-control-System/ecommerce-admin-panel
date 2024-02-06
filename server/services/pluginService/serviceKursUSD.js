/**
 * сервис для работы с курсом валют
 * - получение курса валют
 */
import modelKursUSD from '../../models/modelKursUSD.js';

const getKurs = async () => {
    const result = {
        usd: null,
        eur: null,
    };

    try {
        const temp = await modelKursUSD.getKurs();
        if (temp.length === 0) {
            const error = new Error(`Kurs not FOUND!!!`);
            error.debug = `kurs usd not found`;
            error.status = 404;
            throw(error);
        }
        return result;
    } catch(err) {
        const error = new Error(err.message || `Internal server error`);
        error.debug = `Error catch in getKurs. stack err - ${err.stack}`;
        error.status = err.status || 500;
        throw (error);
    }
};

const servicePluginKursUSD = {
    getKurs,
};

export default servicePluginKursUSD;