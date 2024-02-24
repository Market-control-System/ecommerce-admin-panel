/**
 * создание XML
 */
import { create } from 'xmlbuilder2'; // Убедитесь, что версия xmlbuilder2 поддерживает этот способ импорта
import { Client } from 'basic-ftp';
import { Readable } from 'stream';
import { configXmlCreate } from '../../inc/configService.js';

const createXmlRozetka = async () => {
    const xmlData = {
        root: {
            child: [
                { name: 'Child 1', value: 'Value 1' },
                { name: 'Child 2', value: 'Value 2' }
            ]
        }
    };

    // Генерация XML
    const xmlContent = create(xmlData).end({ prettyPrint: true });

    // Создание FTP клиента и подключение
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

const seerviceXmlCreate = {
    createXmlRozetka,
};

export default seerviceXmlCreate;