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
    {
        path: '/xml/Epicentr',
        name: 'xmlepicentr',
        component: () => import('../views/XML/XmlEpicentr.vue'),
        meta: {
            requiresAuth: false,
            title: 'XML Epicentr',
        },
    },
];

export default xmlRoutes;
