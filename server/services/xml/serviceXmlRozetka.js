/**
 * сервис для работы / подготовки данных
 * для xml розетки
 * - получение списка товаров подходящих для розетки
 * - обновление данных (название / описание и тд)
 */
// import modelKursUSD from '../../models/modelKursUSD.js';
import toReturnXML from '../../toReturnFormat/xml/xmlRoutesReturn.js';
import modelProductXMLRozetka from '../../models/product/modelProductXMLRozetka.js';

const getProductAll = async () => {
    try {
        // получем полный список товаров - весь
        console.log('XML get product start ....');
        const tempProd = await modelProductXMLRozetka.getProductList();
        const tempFoto = await modelProductXMLRozetka.getFoto();
        // формируем массив из тех что подходят по параметрам (маржа и дата на складе)
        const result = tempProd.map(product  => {
            const temp = toReturnXML.rout.xmlRozetka();
        
            temp.productInfo.category.id = product.idType;
            temp.productInfo.category.ru = product.titleType;
            temp.productInfo.category.ua = product.titleTypeUA;

            temp.productInfo.description.ru = product.kopisZapchastBS;
            temp.productInfo.description.ua = product.kopisZapchastBSUA;

            temp.productInfo.kod = product.kod;
            temp.productInfo.id  = product.id;
            temp.productInfo.ostatok = product.ostatok;

            temp.productInfo.price.currency = 'USD';
            temp.productInfo.price.value = product.cenaOutBS;

            temp.productInfo.title.ru = product.titleZapchastBS;
            temp.productInfo.title.ua = product.titleZapchastBSUA;

            const productPhotos = tempFoto.filter(photo => photo.id === product.id);
            temp.productInfo.foto = [...productPhotos];

            if (!product.kodXML) {
                
            } else {
                temp.productInXML.category.id = product.catId;
                temp.productInXML.category.ua = product.catNameUA;

                temp.productInXML.id = product.idXML;
                temp.productInXML.kod = product.kodXML;
                temp.productInXML.price = product.price;
                temp.productInXML.vendor = product.vendor;

                temp.productInXML.foto =product.picture.split(';');
                
                temp.productInXML.description.ru = product.description;
                temp.productInXML.description.ua = product.description_ua;
                
                temp.productInXML.title.ru = product.name;
                temp.productInXML.title.ua = product.name_ua;

                temp.productInXML.param = JSON.parse(product.param);
            } 
            

            return temp;
        });
        // запрашиваем информацию в таблице "розетка"

        // формируем итоговый массив
        // if (tempProd.length === 0) {
        //    const error = new Error(`Kurs not FOUND!!!`);
        //    error.debug = `kurs usd not found`;
        //    error.status = 404;
        //    throw(error);
        // }
        // console.log(tempProd);
        console.log('XML get product END ....');
        return result;
    } catch(err) {
        const error = new Error(err.message || `Internal server error`);
        error.debug = `Error catch in get product XML rozetka. stack err - ${err.stack}`;
        error.status = err.status || 500;
        throw (error);
    }
};

const getCatRozetka = async () => {
    try {
        console.log('XML get cat start ....');
        const tempCat = await modelProductXMLRozetka.getCatRozetka();
        
        const result = tempCat.map(cat  => {
            const temp = toReturnXML.rout.xmlCatRozetka();
        
            temp.id = cat.rz_id;
            temp.ua = cat.zr_name;
            temp.desc = cat.zr_desc;

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

        const isIsset = await modelProductXMLRozetka.searchProductById(formData.productId);
        console.log('isIsset - ', isIsset);
        if (isIsset.length === 0) {
            // если нет - запуск модели по добавлению
            const reInsert = await modelProductXMLRozetka.addXMLRow(formData);
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


const serviceXmlRozetka = {
    getProductAll,
    getCatRozetka,
    addUpdateXmlRow,
};

export default serviceXmlRozetka;