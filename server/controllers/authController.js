/**
 * контроллер авторизации
 * Авторизация - получение токена
 * Регистрация - возможно будет позже
 */
import validUserData from '../validator/validUserData.js';
import serviceAuth from '../services/user/authService.js';

const login = async (req, res, next) => {
    try {
        // определить входные данные
        const { login, password } = req.body;

        // валидация данных
        if (!validUserData.userPassword(password) || !validUserData.userPhoneNumber(login)){
            const error = new Error('Login or Password - not in current format');
            error.status = 401;
            return next(error);
        }
        // вызов сервиса
        const result = await serviceAuth.login(login, password);
        // формирование данных для ответа на фронт
        return res.status(200).json(result);
    } catch (err) {
        // console.log('Error in login - ', err);
        const error = new Error(err.message || "Internal server error");
        error.status = error.status || 500;
        return next(error);
    };
};
/**
 * для авторизации (при обнолвении страницы) 
 * получаем данные текузего пользователя
 * берем его айди из токена
 */
const readMyInfo = async (req, res, next) => {
    try {
        // определить входные данные
        const user = req.user;

        const result = await serviceAuth.userInfoById(user.userId);
        // формирование данных для ответа на фронт
        return res.status(200).json(result);
    } catch (err) {
        //console.log('Error in login - ', err);
        const error = new Error(err.message || "Internal server error");
        error.status = error.status || 500;
        return next(error);
    };
};

export default {
  login,
  readMyInfo,
};
