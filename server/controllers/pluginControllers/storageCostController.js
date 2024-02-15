/**
 * контроллер плагина storage Cost - получение общей тоимости складов по дате, 
 * диапазону даты или другим хар-кам
 */

// загрузка самых свежых данных
const loadLastCost = async (req, res, next) => {
    try {
        const result = await service;
        
        return res.status(200).json(result);
    } catch (err) {
        // console.log('Error in login - ', err);
        const error = new Error(err.message || "Internal server error");
        error.status = error.status || 500;
        return next(error);
    };
};

export default {
    loadLastCost,
};
  