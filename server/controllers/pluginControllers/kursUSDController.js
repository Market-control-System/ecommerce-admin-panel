import servicePluginKursUSD from '../../services/pluginService/serviceKursUSD.js';
/**
 * получить текущий курс валют на сайте - берем курс с profitools.dp.ua
 * перед началом мы уже проверили атворизации
 * и проверили уровень доступа
 * 
 * теперь нам надо 
 * - вызвать сервис
 * - получить данные
 * - отправить их на фронт
 */
const getKurs = async (req, res, next) => {
    try {
        const result = await servicePluginKursUSD.getKurs();
        
        return res.status(200).json(result);
    } catch (err) {
        // console.log('Error in login - ', err);
        const error = new Error(err.message || "Internal server error");
        error.status = error.status || 500;
        return next(error);
    };
};

export default {
    getKurs,
};
  