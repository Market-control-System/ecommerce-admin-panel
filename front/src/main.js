import { createApp } from 'vue';
import { createPinia } from 'pinia';
import useAuthStore from './stores/authStore';
import App from './App.vue';
import router from './router';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/main.scss';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);

(async () => {
    const authStore = useAuthStore();
    await authStore.initializeUser();
    app.use(router);
    app.mount('#app');
})();
