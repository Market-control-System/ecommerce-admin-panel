/**
 * модель запросов к БД
 * для получения разных список товаров
 */
import { executeQuery } from '../../utils/dbQueries.js';

// для Эпицентра мы берем только те товары, которые уже подготовили для Розетки!!!!
const getProductList = async () => {
    const DBName = 'motoservice';
    const query = `
        SELECT *
        FROM rozetka_xml xml
        WHERE catIdEpicentr = '';
    `;

    try {
        const rows = await executeQuery(DBName, query, []);
        // console.log(rows);
        return rows;
    } catch(err) {
        const error = new Error(err.message || `Internal server error`);
        error.debug = `Error catch in model XML rozetka / getproductList. stack err - ${err.stack}`;
        error.status = err.status || 500;
    }
};

const getXmlOffers = async () => {
    const DBName = 'motoservice';
    const query = `
        SELECT xml . *, zm.ostatok, zp.cenaOutBS
        FROM rozetka_xml xml
        JOIN zapchasti_price zp ON xml.idXML = zp.id
        JOIN zapchasti_model zm ON xml.idXML = zm.id
        WHERE xml.catIdEpicentr <> '';
    `;

    try {
        const rows = await executeQuery(DBName, query, []);
        // console.log(rows);
        return rows;
    } catch(err) {
        const error = new Error(err.message || `Internal server error`);
        error.debug = `Error catch in model XML rozetka / getproductList. stack err - ${err.stack}`;
        error.status = err.status || 500;
    }
};

const getFoto = async () => {
    const DBName = 'motoservice';
    const query = `
        SELECT *
        FROM zapchasti_foto
        Order by id;
    `;
    try {
        const rows = await executeQuery(DBName, query, []);
        return rows;
    } catch(err) {
        const error = new Error(err.message || `Internal server error`);
        error.debug = `Error catch in model XML rozetka / getproductList. stack err - ${err.stack}`;
        error.status = err.status || 500;
    }
};

const getCatEpicentr = async () => {
    const DBName = 'motoservice';
    const query = `
        SELECT *
        FROM epicentr_xml_cat 
        Order by idRowCat;
    `;
    try {
        const rows = await executeQuery(DBName, query, []);
        return rows;
    } catch(err) {
        const error = new Error(err.message || `Internal server error`);
        error.debug = `Error catch in model XML rozetka / getCatRozetka. stack err - ${err.stack}`;
        error.status = err.status || 500;
    }
};
// поиск товара по айдишнику
const searchProductById = async (idZapchast) => {
    const DBName = 'motoservice';
    const query = `
        SELECT *
        FROM rozetka_xml
        WHERE idXML = ?;
    `;
    try {
        const rows = await executeQuery(DBName, query, [idZapchast]);
        return rows;
    } catch(err) {
        const error = new Error(err.message || `Internal server error`);
        error.debug = `Error catch in model XML rozetka / getCatRozetka. stack err - ${err.stack}`;
        error.status = err.status || 500;
    }
};

const searchProductByKod = async (kodZp) => {
    const DBName = 'motoservice';
    const query = `
        SELECT *
        FROM rozetka_xml
        WHERE kodXML = ?;
    `;
    try {
        const rows = await executeQuery(DBName, query, [kodZp]);
        return rows;
    } catch(err) {
        const error = new Error(err.message || `Internal server error`);
        error.debug = `Error catch in model XML rozetka / getCatRozetka. stack err - ${err.stack}`;
        error.status = err.status || 500;
    }
};
// добавление строки 
const addXMLRow = async (D) => {
    // обновляем данные в строке - доабвляем эпицентра данные
    const DBName = 'motoservice';
    const query = `
        UPDATE rozetka_xml
        SET catNameEpicentr = ?,
            catIdEpicentr = ?,
            paramEpic = ?
        WHERE kodXML = ?;
    `;
    try {
        const params = [
            D.epicCatName, D.epicCatId,
            JSON.stringify(D.params), D.productKod,
        ];
        const rows = await executeQuery(DBName, query, params);
        return rows;
    } catch(err) {
        const error = new Error(err.message || `Internal server error`);
        error.debug = `Error catch in model XML rozetka. stack err - ${err.stack}`;
        error.status = err.status || 500;
        throw (error);
    }
}



const modelProductXMLEpicentr = {
    getProductList,
    getFoto,
    getXmlOffers,
    getCatEpicentr,
    searchProductById,
    searchProductByKod,
    addXMLRow,
};

export default modelProductXMLEpicentr;