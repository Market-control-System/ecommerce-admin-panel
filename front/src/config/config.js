const config = {
    serverApiBaseURL: 'https://seal-app-w3yo5.ondigitalocean.app', // 'http://localhost:3000',
    validLoginRgp: /^\d{3}-\d{3}-\d{2}-\d{2}$/, // 097-333-22-22
    validPassword: {
        minLen: 5,
    },
    nameProject: 'Admin Panel',
    tokenLocalStorage: 'authToken',
    userInfoLocalStorage: 'userInfo',
};

export default config;
