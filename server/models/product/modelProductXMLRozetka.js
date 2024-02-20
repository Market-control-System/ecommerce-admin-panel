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
        LIMIT 10;
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
}

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
}


const modelProductXMLRozetka = {
    getProductList,
    getFoto,
    getCatRozetka,
};

export default modelProductXMLRozetka;