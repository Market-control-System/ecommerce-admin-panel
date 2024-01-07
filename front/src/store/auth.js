import { defineStore } from 'pinia';
import router from '@/router';
import { sendLogin } from '@/api-service/auth-service.js';
import { useErrorStore } from './error';
import { useTokenStore } from './token';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    nameLocalStorage: 'userData',
    isAuthenticated: false,
    user: null,
  }),
  actions: {
    async login(login, password) {
      const errorStore = useErrorStore();
      const tokenStore = useTokenStore();
      // логика для входа
      //this.isAuthenticated = true;
      try {
          const response = await sendLogin(login, password);
          //console.log('Login successful:', response);
          // Обработка ответа, например, сохранение токена аутентификации
          if (!response.error){
              //console.log('god login');
              tokenStore.setToken(response.data.token);
              this.setUserData(response.data.user);
              this.isAuthenticated = true;
              router.push('/'); 
          } else {
              errorStore.error = true;
              errorStore.msg   = `Login failed: ${response.msg}`;
              errorStore.component = 'Auth store. Send Login';
          }
      } catch (error) {
          console.error('Login failed:', error);
          errorStore.error = true;
          errorStore.msg   = `Login failed: ${error}`;
          errorStore.component = 'Auth store. Send Login';
      }

      return true;
    },
    logout() {
      // логика для выхода
      this.isAuthenticated = false;
      this.user = null;
      const tokenStore = useTokenStore();
      tokenStore.clearToken();
    },
    setUserData(userData) { // устанавливаем начальные данные пользователя
      localStorage.setItem(this.nameLocalStorage, JSON.stringify(userData));
      this.user = userData;
      return true;
    },
    setUserDataFromLocalStorage(){
      if (!localStorage.getItem(this.nameLocalStorage)){
        return false;
      }

      this.user = JSON.parse(localStorage.getItem(this.nameLocalStorage));
      this.isAuthenticated = true;
      return true;
    },
  }
});
