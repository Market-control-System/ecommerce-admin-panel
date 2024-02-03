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

const tokenInfo = () => ({
    userId: null,
    role: null,
    block: null,
});

const loginUser = () => ({
    token: token(),
    userInfo: userInfo(),
});

const toReturn = {
    dataFormt: {
        userInfo,
        token,
        tokenInfo,
    },

    rout: {
        login: loginUser,
        myInfo: userInfo,
    }
};

export default toReturn;