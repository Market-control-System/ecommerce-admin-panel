import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/main.scss';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

app.config.devtools = process.env.NODE_ENV === 'development';
app.config.errorHandler = (err, vm, info) => {
    console.error(err, info);
};

app.mount('#app');
