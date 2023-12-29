export const configDBPr = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
};

export const configAuth = {
    secret_key: 'prKey',
    expires_key: '10h',
};