/**
 * создание XML
 */
import modelProductXMLRozetka from '../../models/product/modelProductXMLRozetka.js';
import modelKursUSD from '../../models/modelKursUSD.js';
//import { configXmlCreate } from '../../inc/configService.js';
import xmlCreator from '../../utils/xmlCreator.js';

const createXmlRozetka = async () => {
    try {
        // плучаем текущий курс
        const tempkursUSD = await modelKursUSD.getKurs();
        const kursUSD = parseFloat(tempkursUSD[0].kurs_d);
        console.log('KURS USD - ', kursUSD);
        // оплучаем данные про катгеории
        const categoryXml = await modelProductXMLRozetka.getCatRozetka();
        // console.log(categoryXml);
        // получаем данные про товары в таблице xml
        const offerXml =  await modelProductXMLRozetka.getXmlOffers();
        // console.log(' OFFERS  - ', offerXml);
        // формируем обьект xml
        const xml = await xmlCreator.createXmlFile(categoryXml, offerXml, kursUSD);
        // сохраняем в файл
        const result = await xmlCreator.uploadXmlToFtp(xml);
        return result;
    } catch(err) {
        const error = new Error(err.message || `Internal server error`);
        error.debug = `Error catch in get product XML rozetka. stack err - ${err.stack}`;
        error.status = err.status || 500;
        throw (error);
    }
};

const seerviceXmlCreate = {
    createXmlRozetka,
};

export default seerviceXmlCreate;