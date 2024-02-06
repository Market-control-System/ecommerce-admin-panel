/**
 * проверка прав доступа к маршруту
 * мы указываем текущий уровень доступа юзера в глобальном значении роута req.user.role
 * а параметром сюда передаем минимально доступный уровень доступа
 * 0 - самый крутой доступ
 * 1 - меньше
 * 9 - совсем мелкий доступ
 * @param {*} minRole 
 * @returns 
 */
function checkRole(minRole) {
    return function(req, res, next) {
        // Предполагается, что tokenUtil.verifyToken уже добавил информацию о пользователе в req.user
        if (!req.user) {
            const error = new Error('No user data found. Authorization required.');
            error.debug = '';
            error.status = 403;
            throw(error);
        }

        if (req.user.role <= minRole) {
            next();
        } else {
            const error = new Error('Access denied. Insufficient permissions.');
            error.debug = '';
            error.status = 403;
            throw(error);
        }
    };
}

export default checkRole;