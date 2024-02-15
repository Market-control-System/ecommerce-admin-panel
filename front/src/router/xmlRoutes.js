const xmlRoutes = [
    {
        path: '/xml/Rozetka',
        name: 'xmlrozetka',
        component: () => import('../views/XML/XmlRozetka.vue'),
        meta: {
            requiresAuth: false, // предполагается наличие авторизации
            title: 'XML Rozetka',
        },
    },
];

export default xmlRoutes;
