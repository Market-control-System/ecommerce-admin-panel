/**
 * модель запросов к БД
 * для получения разных список товаров
 */
import { executeQuery } from '../../utils/dbQueries.js';

// получаем список товаров с ценами - товары те что не старше 2-х лет ?
const getProductList = async () => {
    const DBName = 'motoservice';
    const query = `
        SELECT zm . * , zp . * , zx . * , ztt.idType, ztl.titleTypeUA, ztl.titleType
        FROM zapchasti_model zm
        JOIN zapchasti_price zp ON zm.id = zp.id
        LEFT JOIN rozetka_xml zx ON zm.id = zx.idXML
        JOIN zapchasti_toType ztt ON zm.id = ztt.id
        JOIN zapchasti_typeList ztl ON ztt.idType = ztl.idType
        WHERE zm.dateCreate >= UNIX_TIMESTAMP( CURDATE( ) - INTERVAL 2 YEAR )
        LIMIT 50;
    `;

    try {
        const rows = await executeQuery(DBName, query, []);
        console.log(rows);
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

const getCatRozetka = async () => {
    const DBName = 'motoservice';
    const query = `
        SELECT *
        FROM rozetka_xml_cat 
        Order by idRow;
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
// добавление строки 
const addXMLRow = async (D) => {
    const DBName = 'motoservice';
    const query = `
        INSERT INTO rozetka_xml
        (idXML, kodXML, catId, catNameUA, catRzId, price, vendor, name, name_ua, description, description_ua, param, picture)
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
    try {
        const params = [
            D.productId, D.productKod, D.productCatId, D.categoryName, D.productCatId,
            D.priceUsd, D.productVendor, D.productNameRU, D.productNameUA,
            D.productDescRU, D.productDescUA, // Убедитесь, что здесь не должно быть D.productDescRU дважды
            JSON.stringify(D.params), D.selectedPhotos.join(';')
        ];
        const rows = await executeQuery(DBName, query, params);
        return rows;
    } catch(err) {
        const error = new Error(err.message || `Internal server error`);
        error.debug = `Error catch in model XML rozetka. stack err - ${err.stack}`;
        error.status = err.status || 500;
    }
}

const modelProductXMLRozetka = {
    getProductList,
    getFoto,
    getCatRozetka,
    searchProductById,
    addXMLRow,
};

export default modelProductXMLRozetka;