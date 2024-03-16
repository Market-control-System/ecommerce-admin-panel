const config = {
    serverApiBaseURL: 'http://localhost:3000', // 'https://seal-app-w3yo5.ondigitalocean.app',
    validLoginRgp: /^\d{3}-\d{3}-\d{2}-\d{2}$/, // 097-333-22-22
    validPassword: {
        minLen: 5,
    },
    nameProject: 'Admin Panel',
    tokenLocalStorage: 'authToken',
    userInfoLocalStorage: 'userInfo',
};

export default config;
