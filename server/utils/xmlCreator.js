import { create } from 'xmlbuilder2'; // Убедитесь, что версия xmlbuilder2 поддерживает этот способ импорта
import { Client } from 'basic-ftp';
import { Readable } from 'stream';
import { configXmlCreate } from '../inc/configService.js';

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
                offerEle.ele('param', { name: param.name }).txt(param.value).up();
            });

            offerEle.up();
        });
        offersEle.up();

        const xml = doc.end({ prettyPrint: true });
        console.log(xml);

        return xml;
    } catch (err) {
        console.error('ERROR - ', err);
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

const xmlCreator = {
    createXmlFile,
    uploadXmlToFtp,
};

export default xmlCreator;