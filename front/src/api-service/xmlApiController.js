import useTokenStore from '@/stores/tokenStore';
import apiProjectServer from './apiProjectServer';

const getProductRozetka = async () => {
    const tokenStore = useTokenStore();

    const method = 'GET';
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
const getProductEpicentr = async () => {
    const tokenStore = useTokenStore();

    const method = 'GET';
    const path = '/api/xml/get-product-epicentr';
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
// получение списка категорий
const getCatRozetka = async () => {
    const tokenStore = useTokenStore();

    const method = 'GET';
    const path = '/api/xml/get-cat-rozetka';
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
const getCatEpicentr = async () => {
    const tokenStore = useTokenStore();

    const method = 'GET';
    const path = '/api/xml/get-cat-epicentr';
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

// обновление / добавлениетовара в xml таблицу
const updateRowXML = async (formData) => {
    const tokenStore = useTokenStore();

    const method = 'POST';
    const path = '/api/xml/update-xmlproduct-rozetka';
    const sendData = { formData };
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
    getCatRozetka,
    updateRowXML,
    getCatEpicentr,
    getProductEpicentr,
};

export default xmlApiController;
