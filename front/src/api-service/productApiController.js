import apiProjectServer from './apiProjectServer';

const getProductList = async (data, token) => {
    const method = 'POST';
    const path = '/api/product/getAll';
    const sendData = {
        marketName: data.marketName,
        filtr: data.filtr,
    };
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Добавление токена в заголовки
    };

    try {
        const resultSend = await apiProjectServer.sendReq(path, method, headers, sendData);
        console.log('RESULT IN LOGIN - ', resultSend);
        return resultSend;
    } catch (err) {
        console.log('Error in register User - ', err);
        return { err: true, message: `Якась помилка в контроллері - ${err}` };
    }
};

const productApiController = {
    getProductList,
};

export default productApiController;