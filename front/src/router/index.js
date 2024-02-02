import { createRouter, createWebHistory } from 'vue-router';
import useUserStore from '@/stores/userStore';
import userRoutes from './userRoutes';
import HomeView from '../views/HomeView.vue';

const routes = [
    ...userRoutes,
    { // только если есть регистрация
        path: '/',
        name: 'home',
        component: HomeView,
        meta: {
            requiresAuth: true,
            title: 'Система управления магазинами',
        },
        beforeEnter: (to, from, next) => {
            const userStore = useUserStore();
            if (!userStore.isUserAuth) {
                next({ name: 'login' }); // Перенаправление на страницу входа
            } else {
                next(); // Продолжить навигацию
            }
        },
    },
];
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL || 'http://localhost'),
    routes,
});

export default router;
