import apiProjectServer from '../apiProjectServer';

const getKurs = async (token) => {
    const method = 'GET';
    const path = '/api/plugin/get-kurs';
    const sendData = {};
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    };

    try {
        const resultSend = await apiProjectServer.sendReq(path, method, headers, sendData);
        return resultSend;
    } catch (err) {
        return { err: true, message: `Якась помилка в контроллері PLUGIN KURS - ${err}` };
    }
};

const kursUSDApiController = {
    getKurs,
};

export default kursUSDApiController;
