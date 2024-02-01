const userRoutes = [
    {
        path: '/user/login',
        name: 'login',
        component: () => import('../views/LoginView.vue'),
        meta: {
            requiresAuth: false, // предполагается наличие авторизации
            title: 'Авторизация',
        },
    },
];

export default userRoutes;
