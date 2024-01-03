import 'dotenv/config';
export const configDBProfitools = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME_PROFITOOLS,
};
export const configDBMotoservice = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME_MOTOSERVICE,
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
    secret_key: 'prKey',
    expires_key: '10h',
};