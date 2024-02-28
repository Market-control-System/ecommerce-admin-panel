import 'dotenv/config';
export const configDBProrab = {
    host: process.env.DB_HOST_PRORABUA,
    user: process.env.DB_USER_PRORABUA,
    password: process.env.DB_PASSWORD_PRORABUA,
    database: process.env.DB_NAME_PRORABUA,
    charset: 'utf8'
};
export const configDBProfitools = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME_PROFITOOLS,
    charset: 'utf8'
};
export const configDBMotoservice = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME_MOTOSERVICE,
    charset: 'utf8'
};
// connect DB admin panel 
export const configDBPanel = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME_PANEL,
    charset: 'utf8'
};
export const configAuth = {
    secret_key: process.env.TOKEN_SECRET_KEY,
    expires_key: '100h',
};

export const configServer = {
    port: process.env.PORT,
};

export const validConfig = {
    user: {
        validLoginRgp: /^\d{3}-\d{3}-\d{2}-\d{2}$/, // 097-333-22-22
    },
};

export const configXmlCreate = {
    ftp: {
        host: process.env.HOST_FTP,
        user: process.env.USER_FTP,
        password: process.env.PASSWORD_FTP,
        secure: false,
    },
    remoteFilePath: '/home/prorabdp/baseparts.com.ua/xml/rozetka.xml',
    name: 'BaseParts',
    url: 'https://baseparts.com.ua',
};