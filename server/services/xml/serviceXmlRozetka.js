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
                temp.productInXML.category.id = product.idType;
                temp.productInXML.category.ru = product.titleType;
                temp.productInXML.category.ua = product.titleTypeUA;
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
        console.log(tempProd);
        console.log('XML get product END ....');
        return result;
    } catch(err) {
        const error = new Error(err.message || `Internal server error`);
        error.debug = `Error catch in get product XML rozetka. stack err - ${err.stack}`;
        error.status = err.status || 500;
        throw (error);
    }
};

const serviceXmlRozetka = {
    getProductAll,
};

export default serviceXmlRozetka;