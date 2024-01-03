import { defineStore } from 'pinia';
import router from '@/router';
import { sendLogin } from '@/api-service/auth-service.js';
import { useErrorStore } from './error';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    user: null,
  }),
  actions: {
    async login(login, password) {
      const errorStore = useErrorStore();
      // логика для входа
      //this.isAuthenticated = true;
      try {
          const response = await sendLogin(login, password);
          //console.log('Login successful:', response);
          // Обработка ответа, например, сохранение токена аутентификации
          if (!response.error){
              //console.log('god login');
              localStorage.setItem('authToken', response.data.token);
              localStorage.setItem('userData', JSON.stringify(response.data.user));
              this.user = response.data.user;
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
    },
    logout() {
      // логика для выхода
      this.isAuthenticated = false;
      localStorage.removeItem('authToken'); 
      router.push('/login');
    }
  }
});
