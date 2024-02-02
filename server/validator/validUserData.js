import { validConfig } from '../inc/configService.js';

const userPhoneNumber = (phoneNumber) => {
    return validConfig.user.validLoginRgp.test(phoneNumber);
};

const userPassword = (password) => {
    return (password.length > 0);
};

const validUserData = {
    userPhoneNumber,
    userPassword,
};

export default validUserData;