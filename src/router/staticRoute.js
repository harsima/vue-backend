const Layout = () => import(/* webpackChunkName: 'index' */ '../page/layout')

const staticRoute = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/error',
        component: () => import(/* webpackChunkName: 'error' */ '../page/error'),
        children: [
            {
                path: '401',
                component: () => import(/* webpackChunkName: 'error' */ '../page/error/401')
            },
            {
                path: '403',
                component: () => import(/* webpackChunkName: 'error' */ '../page/error/403')
            },
            {
                path: '404',
                component: () => import(/* webpackChunkName: 'error' */ '../page/error/404')
            },
            {
                path: '500',
                component: () => import(/* webpackChunkName: 'error' */ '../page/error/500')
            }
        ]
    },
    {
        path: '/login',
        component: () => import(/* webpackChunkName: 'login' */ '../page/login')
    },
    {
        path: '/home',
        component: Layout,
        children: [
            {
                path: '',
                component: () => import(/* webpackChunkName: 'home' */ '../page/home'),
            }
        ]
    },
    {
        path: '/components',
        component: Layout,
        children: [
            {
                path: '',
                component: () => import(/* webpackChunkName: 'components' */ '../page/components')
            },
            {
                path: 'pageNotes',
                component: () => import(/* webpackChunkName: 'components' */ '../page/components/assist/pageNotes')
            },
            {
                path: 'permission',
                component: () => import(/* webpackChunkName: 'components' */ '../page/components/function/permission')
            },
            {
                path: 'pageTable',
                component: () => import(/* webpackChunkName: 'components' */ '../page/components/function/pageTable')
            },
            {
                path: 'pageSearch',
                component: () => import(/* webpackChunkName: 'components' */ '../page/components/ui/pageSearch')
            },
            {
                path: 'pageSection',
                component: () => import(/* webpackChunkName: 'components' */ '../page/components/ui/pageSection')
            },
            {
                path: 'pageTitle',
                component: () => import(/* webpackChunkName: 'components' */ '../page/components/ui/pageTitle')
            },
            {
                path: 'pageToolbar',
                component: () => import(/* webpackChunkName: 'components' */ '../page/components/ui/pageToolbar')
            }
        ]
    },
    {
        path: '/example',
        component: Layout,
        children: [
            {
                path: 'table',
                component: () => import(/* webpackChunkName: 'example' */ '../page/example/table')
            },
            {
                path: 'charts',
                component: () => import(/* webpackChunkName: 'example' */ '../page/example/charts')
            },
            {
                path: 'map',
                component: () => import(/* webpackChunkName: 'example' */ '../page/example/map')
            }
        ]
    },
    {
        path: '/i18n',
        component: Layout,
        children: [
            {
                path: '',
                component: () => import(/* webpackChunkName: 'i18n' */ '../page/i18n')
            }
        ]
    },
    {
        path: '/theme',
        component: Layout,
        children: [
            {
                path: '',
                component: () => import(/* webpackChunkName: 'themeChange' */ '../page/themeChange')
            }
        ]
    },
    {
        path: '*',
        redirect: '/error/404'
    }
]

export default staticRoute