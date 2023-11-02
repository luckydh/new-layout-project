// function defaultLayout() {
//     // '@' is aliased to src/components
//     return () =>
//         import ('@/layouts/default')
// }

export default [
//     {
//     path: '*',
//     redirect: {
//         path: '/'
//     }
// },
    {
        path: '/',
        name: 'HomePage',
        component: () =>
            import (
                `@/pages/HomePage.vue`
                )
    },
    {
        path: '/test',
        name: 'TestPage',
        component: () =>
            import (
                `@/pages/test.vue`
                )
    },
    // {
    //     path: '/newporequest',
    //     name: 'NewPORequestModal',
    //     component: () =>
    //         import (
    //             `@/pages/NewPORequest.vue`
    //             )
    // },
    // {
    //     path: '/404',
    //     name: 'NotFound',
    //     component: () =>
    //         import (
    //             /* webpackChunkName: "routes" */
    //             `@/views/errors/NotFound.vue`
    //             )
    // },
    // {
    //     path: '/403',
    //     name: 'AccessDenied',
    //     component: () =>
    //         import (
    //             /* webpackChunkName: "routes" */
    //             `@/views/errors/Deny.vue`
    //             )
    // },
    // {
    //     path: '/500',
    //     name: 'ServerError',
    //     component: () =>
    //         import (
    //             `@/views/errors/Error.vue`
    //             )
    // },
    // {
    //     path: '/login',
    //     name: 'Login',
    //     component: () =>
    //         import (
    //             `@/views/auth/Login.vue`
    //             ),
    // },
    // {
    //     path: '/system',
    //     component: defaultLayout(),

    //     children: [{
    //         path: '/',
    //         redirect: {
    //             path: '/system/dashboard'
    //         },
    //     },
    //         {
    //             path: 'dashboard',
    //             component: () =>
    //                 import (
    //                     `@/views/Dashboard.vue`
    //                     ),
    //             meta: {
    //                 requiresAuth: true,
    //                 checkPermission: []
    //             },
    //             name: 'Dashboard'
    //         },
    //         {
    //             path: 'profile',
    //             component: () =>
    //                 import (
    //                     `@/views/Profile.vue`
    //                     ),
    //             meta: {
    //                 requiresAuth: true,
    //                 checkPermission: []
    //             },
    //             name: 'Profile'
    //         },
    //         {
    //             path: 'report',
    //             meta: {
    //                 requiresAuth: true
    //             },
    //             component: () =>
    //                 import (
    //                     `@/views/report/Layout.vue`
    //                     ),
    //             children: [{
    //                 path: 'revenue-report',
    //                 name: 'RevenueReport',
    //                 component: () =>
    //                     import (
    //                         `@/views/report/RevenueReport.vue`
    //                         ),
    //                 meta: {
    //                     requiresAuth: true,
    //                     checkPermission: ['read revenue-report']
    //                 }
    //             }, {
    //                 path: 'late-stay-report',
    //                 name: 'LateStayReport',
    //                 component: () =>
    //                     import (
    //                         `@/views/report/LateStayReport.vue`
    //                         ),
    //                 meta: {
    //                     requiresAuth: true,
    //                     checkPermission: ['read late-stay-report']
    //                 }
    //             }, {
    //                 path: 'trekkers-report',
    //                 name: 'TrekkersReport',
    //                 component: () =>
    //                     import (
    //                         `@/views/report/TrekkersReport.vue`
    //                         ),
    //                 meta: {
    //                     requiresAuth: true,
    //                     checkPermission: ['read trekkers-report']
    //                 }
    //             },]
    //         },
    //         {
    //             path: 'issued-visa',
    //             meta: {
    //                 requiresAuth: true
    //             },
    //             component: () =>
    //                 import (
    //                     `@/views/issuedVisa/Layout.vue`
    //                     ),
    //             children: [{
    //                 path: '/',
    //                 name: 'IssuedVisa',
    //                 component: () =>
    //                     import (
    //                         `@/views/issuedVisa/List.vue`
    //                         ),
    //                 meta: {
    //                     requiresAuth: true,
    //                     checkPermission: ['read issued-visa']
    //                 }
    //             },]
    //         },
    //         {
    //             path: 'travellers-history',
    //             meta: {
    //                 requiresAuth: true
    //             },
    //             component: () =>
    //                 import (
    //                     `@/views/travellersHistory/Layout.vue`
    //                     ),
    //             children: [{
    //                 path: '/',
    //                 name: 'TravellersHistory',
    //                 component: () =>
    //                     import (
    //                         `@/views/travellersHistory/List.vue`
    //                         ),
    //                 meta: {
    //                     requiresAuth: true,
    //                     checkPermission: ['read travellers-history']
    //                 }
    //             }, {
    //                 path: 'view/:id',
    //                 name: 'TravellersHistoryView',
    //                 props: true,
    //                 component: () =>
    //                     import (
    //                         `@/views/travellersHistory/view.vue`
    //                         ),
    //                 meta: {
    //                     requiresAuth: true,
    //                     checkPermission: ['read travellers-history']
    //                 }
    //             },]
    //         },
    //         {
    //             path: 'role',
    //             meta: {
    //                 requiresAuth: true
    //             },
    //             component: defaultLayout(),
    //             children: [{
    //                 path: '/',
    //                 name: 'Role',
    //                 component: () =>
    //                     import (
    //                         `@/views/acl/role/List.vue`
    //                         ),
    //                 meta: {
    //                     requiresAuth: true,
    //                     checkPermission: ['read role']
    //                 }
    //             },]
    //         },
    //         {
    //             path: 'user',
    //             meta: {
    //                 requiresAuth: true
    //             },
    //             component: defaultLayout(),
    //             children: [{
    //                 path: '/',
    //                 name: 'User',
    //                 component: () =>
    //                     import (
    //                         `@/views/acl/user/List.vue`
    //                         ),
    //                 meta: {
    //                     requiresAuth: true,
    //                     checkPermission: ['read user']
    //                 }
    //             },]
    //         },
    //          {
    //             path: 'parent',
    //             meta: {
    //                 requiresAuth: true
    //             },
    //             component: () =>
    //                 import (
    //                     `@/views/parent/Layout.vue`
    //                     ),
    //             children: [
    //                 {
    //                     path: 'child1',
    //                     name: 'child1',
    //                     component: () =>
    //                         import (
    //                             `@/views/parent/Child1.vue`
    //                             ),
    //                     meta: {
    //                         requiresAuth: true,
    //                         checkPermission: []
    //                     }
    //                 },
    //                 {
    //                     path: ':type',
    //                     name: 'VisaRequest',
    //                     component: () =>
    //                         import (
    //                             `@/views/visaRequest/List.vue`
    //                             ),
    //                     meta: {
    //                         requiresAuth: true,
    //                         checkPermission: ['read visa-request']
    //                     }
    //                 },
    //                 {
    //                     path: 'view/:id',
    //                     name: 'ViewVisaRequest',
    //                     props: true,
    //                     component: () =>
    //                         import (
    //                             `@/views/visaRequest/view.vue`
    //                             ),
    //                     meta: {
    //                         requiresAuth: true,
    //                         checkPermission: ['read visa-request']
    //                     }
    //                 },
    //                 {
    //                     path: 'edit/:id',
    //                     name: 'EditVisaRequest',
    //                     props: true,
    //                     component: () =>
    //                         import (
    //                             `@/views/visaRequest/edit.vue`
    //                             ),
    //                     meta: {
    //                         requiresAuth: true,
    //                         checkPermission: ['edit visa-request']
    //                     }
    //                 },
    //             ]
    //         },

    //         {
    //             path: 'activity-logs',
    //             meta: {
    //                 requiresAuth: true
    //             },
    //             component: defaultLayout(),
    //             children: [{
    //                 path: '/',
    //                 name: 'ActivityLog',
    //                 component: () =>
    //                     import (
    //                         `@/views/activityLog/List.vue`
    //                         ),
    //                 meta: {
    //                     requiresAuth: true,
    //                     checkPermission: ['read activity-log']
    //                 }
    //             }]
    //         },

    //     ]
    // }
]
