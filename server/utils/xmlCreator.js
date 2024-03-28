import { create } from 'xmlbuilder2'; // Убедитесь, что версия xmlbuilder2 поддерживает этот способ импорта
import { Client } from 'basic-ftp';
import { Readable } from 'stream';
import { configXmlCreate } from '../inc/configService.js';

function getCurrentDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    // Если вам нужны также секунды, можно добавить следующую строку:
    // const seconds = String(now.getSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}`;
    // Для добавления секунд, используйте:
    // return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

async function createXmlFile(catXml, offerXml, kursUSD) {
    try {
        const doc = create({ version: '1.0', encoding: 'UTF-8' })
        .ele('yml_catalog', { date: new Date().toISOString() })
            .ele('shop');
        doc.ele('name').txt('BaseParts').up();
        doc.ele('url').txt('https://baseparts.com.ua').up();

        // Добавление валют
        const currenciesEle = doc.ele('currencies');
        currenciesEle.ele('currency', { id: 'UAH', rate: '1' }).up();
        currenciesEle.up();

        // Добавление категорий
        const categoriesEle = doc.ele('categories');
        catXml.forEach(cat => {
            categoriesEle.ele('category', { id: cat.rz_id }).txt(cat.zr_name).up();
        });
        categoriesEle.up();

        // Добавление предложений
        const offersEle = doc.ele('offers');
        offerXml.forEach(offer => {
            const offerEle = offersEle.ele('offer', { id: offer.kodXML, available: offer.ostatok > 0 });
            offerEle.ele('price').txt(Math.round(offer.cenaOutBS * kursUSD).toString()).up();
            offerEle.ele('currencyId').txt('UAH').up();
            offerEle.ele('categoryId').txt(offer.catId).up();

            offer.picture.split(';').forEach(pic => {
                offerEle.ele('picture').txt(pic).up();
            });

            offerEle.ele('vendor').txt(offer.vendor).up();
            offerEle.ele('article').txt(offer.kodXML).up();
            offerEle.ele('stock_quantity').txt(offer.ostatok.toString()).up();
            offerEle.ele('name').txt(offer.name).up();
            offerEle.ele('name_ua').txt(offer.name_ua).up();
            offerEle.ele('description').txt(offer.description).up();
            offerEle.ele('description_ua').txt(offer.description_ua).up();

            JSON.parse(offer.param).forEach(param => {
                // Инициализация объекта атрибутов с обязательным атрибутом name
                let attributes = { name: param.name };
            
                // Добавление paramid и valueid в объект атрибутов, если они существуют и не пусты
                if (param.paramid) {
                    attributes.paramid = param.paramid;
                }
                if (param.valueid) {
                    attributes.valueid = param.valueid;
                }
            
                // Создание элемента с атрибутами
                offerEle.ele('param', attributes).txt(param.value).up();
            });
            offerEle.up();
        });
        offersEle.up();

        const xml = doc.end({ prettyPrint: true });
        // console.log(xml);

        return xml;
    } catch (err) {
        console.error('ERROR CREATE XML - ', err);
        throw new Error('Failed to create XML');
    }
};

async function uploadXmlToFtp(xmlContent) {
    const client = new Client();

    try {
        await client.access({
            host: configXmlCreate.ftp.host,
            user: configXmlCreate.ftp.user,
            password: configXmlCreate.ftp.password,
            secure: configXmlCreate.ftp.secure,
        });

        // Путь к файлу на FTP сервере
        const remoteFilePath = configXmlCreate.remoteFilePath;

        // Преобразование строки XML в поток
        const xmlStream = new Readable();
        xmlStream.push(xmlContent);
        xmlStream.push(null); // Необходимо для сигнализации о конце потока

        // Сохранение файла через FTP, используя поток
        await client.uploadFrom(xmlStream, remoteFilePath);

        // Отправка ответа клиенту
        return 'XML file generated and uploaded successfully.';
    } catch(err) {
        console.log(err);
        throw new Error(`Error during XML file generation or upload: ${err.message}`);
    } finally {
        client.close();
    }
};

async function uploadXmlToFtpEpic(xmlContent) {
    const client = new Client();

    try {
        await client.access({
            host: configXmlCreate.ftp.host,
            user: configXmlCreate.ftp.user,
            password: configXmlCreate.ftp.password,
            secure: configXmlCreate.ftp.secure,
        });

        // Путь к файлу на FTP сервере
        const remoteFilePath = configXmlCreate.remoteFilePathEpic;

        // Преобразование строки XML в поток
        const xmlStream = new Readable();
        xmlStream.push(xmlContent);
        xmlStream.push(null); // Необходимо для сигнализации о конце потока

        // Сохранение файла через FTP, используя поток
        await client.uploadFrom(xmlStream, remoteFilePath);

        // Отправка ответа клиенту
        return 'XML file generated and uploaded successfully.';
    } catch(err) {
        console.log(err);
        throw new Error(`Error during XML file generation or upload: ${err.message}`);
    } finally {
        client.close();
    }
};

async function createXmlFileEpic (offerXml, kursUSD) {
    try {
        const doc = create({ version: '1.0', encoding: 'UTF-8' })
        .ele('yml_catalog', { date: getCurrentDateTime() });

        // Добавление предложений
        const offersEle = doc.ele('offers');
        offerXml.forEach(offer => {
            const offerEle = offersEle.ele('offer', { id: offer.kodXML, available: offer.ostatok > 0 });
            offerEle.ele('price').txt(Math.round(offer.cenaOutBS * kursUSD).toString()).up();
            offerEle.ele('category', {code: offer.catIdEpicentr}).txt(offer.catNameEpicentr).up();
            // <attribute_set code="3343">Картини за номерами</attribute_set>
            offerEle.ele('attribute_set', {code: offer.catIdEpicentr}).txt(offer.catNameEpicentr).up();

            offer.picture.split(';').forEach(pic => {
                offerEle.ele('picture').txt(pic).up();
            });

            offerEle.ele('name', {lang: 'ru'}).txt(offer.name).up();
            offerEle.ele('name', {lang: 'ua'}).txt(offer.name_ua).up();

            offerEle.ele('description', {lang: 'ru'}).txt(offer.description).up();
            offerEle.ele('description', {lang: 'ua'}).txt(offer.description_ua).up();

            // <vendor code="38bc621b9f424403844ad267856b2f4b">Optimum Nutrition</vendor>
            offerEle.ele('vendor', {code: '33c57c8764a549f7ad1445d62d874649'}).txt('Китай').up();
            // <country_of_origin code="pol">Польща</country_of_origin>
            offerEle.ele('country_of_origin', {code: 'chn'}).txt('Китай').up();
            // <param name="Міра виміру" paramcode="measure" valuecode="measure_pcs">шт.</param>
            offerEle.ele('param', {name: 'Міра виміру', paramcode: 'measure', valuecode: 'measure_pcs'}).txt('шт.').up();
            // <param name="Мінімальна кратність товару" paramcode="ratio">1</param>
            offerEle.ele('param', {name: 'Мінімальна кратність товару', paramcode: 'ratio'}).txt('1').up();

            JSON.parse(offer.paramEpic).forEach(param => {
                // Инициализация объекта атрибутов с обязательным атрибутом name
                let attributes = { name: param.name, paramcode: param.paramcode, };

                if (param.valuecode) {
                    attributes.valuecode = param.valuecode;
                }
                // Создание элемента с атрибутами
                // <param paramcode="3176" name="Тематика" valuecode="bsz6btxa,wle9vq5zsirz1dni">тварини, коти</param>
                offerEle.ele('param', attributes).txt(param.text).up();
            });
            offerEle.up(); // offer/
        });
        offersEle.up();
        offersEle.up();
        const xml = doc.end({ prettyPrint: true });
        console.log(xml);

        return xml;
    } catch (err) {
        console.error('ERROR CREATE XML - ', err);
        throw new Error('Failed to create XML');
    }
};

const xmlCreator = {
    createXmlFile,
    createXmlFileEpic,
    uploadXmlToFtp,
    uploadXmlToFtpEpic,
};

export default xmlCreator;