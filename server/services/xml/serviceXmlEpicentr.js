/**
 * сервис для работы / подготовки данных
 * для xml Epicentr
 * - получение списка товаров подходящих для розетки
 * - обновление данных (название / описание и тд)
 */
import toReturnXML from '../../toReturnFormat/xml/xmlRoutesReturn.js';
import modelProductXMLEpicentr from '../../models/product/modelProductXMLEpicentr.js';

const getProductAll = async () => {
    try {
        // получем полный список товаров - весь
        console.log('XML get product start ....');
        const tempProd = await modelProductXMLEpicentr.getProductList();
        // формируем массив из тех что подходят по параметрам (маржа и дата на складе)
        const result = tempProd.map(product  => {
            const temp = toReturnXML.rout.xmlEpicentr();
       
            temp.kod = product.kodXML;
            temp.id = product.idXML;

            temp.title.ru = product.name;
            temp.title.ua = product.name_ua;
            temp.category.id = product.catIdEpicentr;
            temp.category.ua = product.catNameEpicentr;
            temp.description.ru = product.description;
            temp.description.ua = product.description_ua;

            temp.foto = product.picture.split(';');

            temp.vendor = product.vendor;

            temp.param = JSON.parse(product.param);

            return temp;
        });
       
        console.log('XML get product END ....');
        return result;
    } catch(err) {
        const error = new Error(err.message || `Internal server error`);
        error.debug = `Error catch in get product XML rozetka. stack err - ${err.stack}`;
        error.status = err.status || 500;
        throw (error);
    }
};

const getCatEpicentr = async () => {
    try {
        console.log('XML get cat start ....');
        const tempCat = await modelProductXMLEpicentr.getCatEpicentr();
        
        const result = tempCat.map(cat  => {
            const temp = toReturnXML.rout.xmlCatRozetka();
        
            temp.id = cat.idCat;
            temp.ua = cat.titleCat;
            temp.desc = cat.descCat;

            return temp;
        });
        
        return result;
    } catch(err) {
        const error = new Error(err.message || `Internal server error`);
        error.debug = `Error catch in get product XML rozetka. stack err - ${err.stack}`;
        error.status = err.status || 500;
        throw (error);
    }
};

// обновление данных в товаре либо его создание
const addUpdateXmlRow = async (formData) => {
    try {
        // отправляем данные в модель - поиск товара за айдишником

        const isIsset = await modelProductXMLEpicentr.searchProductById(formData.productId);
        console.log('isIsset - ', isIsset);
        if (isIsset.length === 0) {
            // если нет - запуск модели по добавлению
            const reInsert = await modelProductXMLEpicentr.addXMLRow(formData);
            console.log('add row - ', reInsert);
        } else {
            // если есть - запуск модели по обновлению
            console.log(' update must be');
        }
        
        return 'ok';
    } catch(err) {
        const error = new Error(err.message || `Internal server error`);
        error.debug = `Error catch in get product XML rozetka. stack err - ${err.stack}`;
        error.status = err.status || 500;
        throw (error);
    }
};


const serviceXmlEpicentr = {
    getProductAll,
    getCatEpicentr,
    addUpdateXmlRow,
};

export default serviceXmlEpicentr;