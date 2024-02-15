import useTokenStore from '@/stores/tokenStore';
import apiProjectServer from './apiProjectServer';

const getProductRozetka = async () => {
    const tokenStore = useTokenStore();

    const method = 'POST';
    const path = '/api/xml/get-product-rozetka';
    const sendData = {};
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenStore.token}`, // Добавление токена в заголовки
    };

    try {
        const resultSend = await apiProjectServer.sendReq(path, method, headers, sendData);
        return resultSend;
    } catch (err) {
        return { err: true, message: `Якась помилка в контроллері - ${err}` };
    }
};

const xmlApiController = {
    getProductRozetka,
};

export default xmlApiController;
