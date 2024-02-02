/**
 * Сервис авторизации
 * - формат данных для передачи на фронт - loginUser in toReturn.js
 */

/**
 * метод авторизации
 * @param {string} phoneNumber 
 * @param {string} password 
 */

import toReturn from '../toReturnFormat.js';
import modelUserInfo from '../../models/user/modelUserInfo.js';
import passwordWork from '../../utils/passwordWork.js';
import tokenUtil from '../../utils/tokenGenerator.js';

const login = async (phoneNumber, password) => {
    const userInfo = toReturn.dataFormt.userInfo();
    let token    = toReturn.dataFormt.token();
    try {
        // find user in DB table
        const tempUser = await modelUserInfo.findUserByLogin(phoneNumber);
        if (tempUser.length === 0) {
            const error = new Error(`User whith login ${phoneNumber} - not found!`);
            error.debug = `User whith login ${phoneNumber} - not found! In model UserInfo -> findUserByLogin`;
            error.status = '404';
            throw(error);
        }

        // compare password
        const isPasswordOk = await passwordWork.comparePassword(password, tempUser[0].password);
        if (!isPasswordOk) {
            const error = new Error('Password is not right');
            error.debug = `Password - ${password} to user - ${phoneNumber} - is not right!`;
            error.status = 401;
            throw(error);
        }

        Object.keys(userInfo).forEach(key => {
            if (tempUser[0].hasOwnProperty(key)) {
                userInfo[key] = tempUser[0][key];
            }
        });

        // generate token 
        token = await tokenUtil.generate(userInfo);
        
        // return result
        const result = toReturn.rout.login();
        result.token = token;
        result.userInfo = {...userInfo};

        return result;
    } catch(err) {
        const error = new Error(err.message || `Internal server error`);
        error.debug = `Error catch in authService / login User. stack err - ${err.stack}`;
        error.status = err.status || 500;
        throw (error);
    }
}

const serviceAuth = {
    login,
};
export default serviceAuth;