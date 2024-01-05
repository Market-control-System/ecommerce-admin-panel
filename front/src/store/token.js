// стор для работы-обработки и контроля токена авторизации
import { defineStore } from 'pinia';
import router from '@/router'; 

export const useTokenStore = defineStore('token', {
    state: () => ({
        token: null,
        tokenExp: false, // токен просрочен
    }),
    getters: {
        isTokenExpired: (state) => state.tokenExp,
      },
    actions: {
        setToken(newToken) {
            this.token = newToken;
            this.tokenExp = false; 
            localStorage.setItem('authToken', newToken);
          },
        clearToken() {
            this.token = null;
            this.tokenExp = true;
            localStorage.removeItem('authToken');
            router.push('/login');
          },
    }
  });
  