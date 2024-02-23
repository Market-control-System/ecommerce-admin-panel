import serviceXmlRozetka from '../../services/xml/serviceXmlRozetka.js';
import validFormData from '../../validator/validXmlRowData.js';
/**
 * контроллер работы с xml rozetka
 * - плучение списко товаров
 * - обновление данных о товаре для розетки
 */
const getProduct = async (req, res, next) => {
    try {
        const result = await serviceXmlRozetka.getProductAll();
        
        return res.status(200).json(result);
    } catch (err) {
        // console.log('Error in login - ', err);
        const error = new Error(err.message || "Internal server error");
        error.status = error.status || 500;
        return next(error);
    };
};

const getCat = async (req, res, next) => {
    try {
        const result = await serviceXmlRozetka.getCatRozetka();
        
        return res.status(200).json(result);
    } catch (err) {
        // console.log('Error in login - ', err);
        const error = new Error(err.message || "Internal server error");
        error.status = error.status || 500;
        return next(error);
    };
};
// добавление - создание xml товара в таблице
const addUpdateXmlRow = async (req, res, next) => {
    try {
        // входные параметры
        const formData = req.body.formData;
        // валидация
        console.log(formData);
        const resValid = await validFormData(formData);
        console.log('resalut valid - ', resValid);
        //const result = await serviceXmlRozetka.getCatRozetka();
        
        return res.status(200).json(result);
    } catch (err) {
        // console.log('Error in login - ', err);
        const error = new Error(err.message || "Internal server error");
        error.status = error.status || 500;
        return next(error);
    };
};

export default {
    getProduct,
    getCat,
    addUpdateXmlRow,
};
  