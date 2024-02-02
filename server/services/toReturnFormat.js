// Форматы возвращаемых обьектов
const userInfo = () => ({
    userId: null,
    userName: null,
    phoneNumber: null,
    role: null,
    dateCreate: null,
    dateUpdate: null,
    block: null,
});

const token = () => (null);

const loginUser = () => ({
    token: token(),
    userInfo: userInfo(),
});

const toReturn = {
    dataFormt: {
        userInfo,
        token,
    },

    rout: {
        login: loginUser,
    }
};

export default toReturn;