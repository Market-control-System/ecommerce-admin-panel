import apiProjectServer from '../apiProjectServer';

/**
 * Загрузка данных о последнем подсчете стоимости складов
 * @param {*} token 
 * @returns 
 */
const loadLastCost = async (token) => {
    const method = 'GET';
    const path = '/api/plugin/storage-cost';
    const sendData = {};
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    };

    try {
        const resultSend = await apiProjectServer.sendReq(path, method, headers, sendData);
        return resultSend;
    } catch (err) {
        return { err: true, message: `Якась помилка в контроллері Storage Cost API - ${err}` };
    }
};

const storageCostApiController = {
    loadLastCost,
};

export default storageCostApiController;
