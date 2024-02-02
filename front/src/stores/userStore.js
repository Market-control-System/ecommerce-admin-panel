/**
 * Стор текущего авторизованного / либо нет юзера
 * Храниит различную его информацию о нем / проектах / тасках
 */
import { defineStore } from 'pinia';

const useUserStore = defineStore('user', {
    state: () => ({
        isUserAuth: false,
        userInfo: { },
    }),

    actions: {
        setUserData(userInfo) {
            this.userInfo = { ...userInfo };
            this.isUserAuth = true;
            return true;
        },
        clear() {
            this.isUserAuth = false;
            this.userInfo = { };
        },
    },
});

export default useUserStore;
