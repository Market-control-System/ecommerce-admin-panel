import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../store/auth'; 
import HomeView from '../views/HomeView.vue';
import LoginViewVue from '@/views/LoginView.vue';

const routes = [
  { 
    // только если есть регистрация
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true } // Добавление мета-тега для требования аутентификации
  },
  { // только если есть регистрация
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginViewVue,
  },
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.matched.some(record => record.meta.requiresAuth) && !authStore.isAuthenticated) {
    // Если маршрут требует аутентификации и пользователь не авторизован
    next({ name: 'login' });
  } else {
    // Если все в порядке, продолжить навигацию
    next();
  }
});

export default router;
