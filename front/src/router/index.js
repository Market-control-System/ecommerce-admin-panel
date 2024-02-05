import { createRouter, createWebHistory } from 'vue-router';
// import AboutViewVue from '@/views/AboutView.vue';
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
    },
];
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL || 'http://localhost'),
    routes,
});

router.beforeEach((to, from, next) => {
    const userStore = useUserStore();
    if (to.meta.requiresAuth && !userStore.isUserAuth) {
        next({ name: 'login' });
    } else {
        next();
    }
});

export default router;
