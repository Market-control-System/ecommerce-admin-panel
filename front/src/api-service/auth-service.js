/**
 * Отправляет запрос на аутентификацию пользователя.
 * @param {string} phoneNumber Номер телефона пользователя.
 * @param {string} password Пароль пользователя.
 * @returns {Promise} Обещание (Promise) с ответом от сервера.
 */
const sendLogin = async (phoneNumber, password) => {
    try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phoneNumber, password }),
        });

        if (!response.ok) {
            return {error:true, msg:`HTTP error! status: ${response.status}`}
        }

        return await response.json(); 
    } catch (error) {
        return {error:true, msg:`Error during login: ${error}`}
    }
};

export { sendLogin };