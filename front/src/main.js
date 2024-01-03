import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { useAuthStore } from './store/auth';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.mount('#app');

// пи инициализации - загружаем с локал стореджа данные о пользователе (если они есть)
const authStore = useAuthStore();
const savedUserData = localStorage.getItem('userData');

if (localStorage.getItem('authToken') && savedUserData) {
  authStore.isAuthenticated = true;
  authStore.user = JSON.parse(savedUserData);
}