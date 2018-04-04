const asyncLayout = [
    {
        path: '/asyncLayout',
        redirect: '/home',
        component: () => import(/* webpackChunkName: 'index' */ '../page/layout'),
        children: []
    }
]

const asyncRoute = [
    {
        path: '/table',
        meta:{
            permission:[]
        },
        component: () => import(/* webpackChunkName: 'table' */ '../page/table')
    },
    {
        path: '/components',
        meta:{
            permission:[]
        },
        component: () => import(/* webpackChunkName: 'components' */ '../page/components')
    },
    {
        path: '/components/pageNotes',
        meta:{
            permission:[]
        },
        component: () => import(/* webpackChunkName: 'components' */ '../page/components/assist/pageNotes')
    },
    {
        path: '/components/permission',
        meta:{
            permission:[]
        },
        component: () => import(/* webpackChunkName: 'components' */ '../page/components/function/permission')
    },
    {
        path: '/components/pageTable',
        meta:{
            permission:[]
        },
        component: () => import(/* webpackChunkName: 'components' */ '../page/components/function/pageTable')
    },
    {
        path: '/components/pageSearch',
        meta:{
            permission:[]
        },
        component: () => import(/* webpackChunkName: 'components' */ '../page/components/ui/pageSearch')
    },
    {
        path: '/components/pageSection',
        meta:{
            permission:[]
        },
        component: () => import(/* webpackChunkName: 'components' */ '../page/components/ui/pageSection')
    },
    {
        path: '/components/pageTitle',
        meta:{
            permission:[]
        },
        component: () => import(/* webpackChunkName: 'components' */ '../page/components/ui/pageTitle')
    },
    {
        path: '/components/pageToolbar',
        meta:{
            permission:[]
        },
        component: () => import(/* webpackChunkName: 'components' */ '../page/components/ui/pageToolbar')
    },
    {
        path: '/example/table',
        meta:{
            permission:[]
        },
        component: () => import(/* webpackChunkName: 'example' */ '../page/example/table')
    },
    {
        path: '/example/charts',
        meta:{
            permission:[]
        },
        component: () => import(/* webpackChunkName: 'example' */ '../page/example/charts')
    },
    {
        path: '/example/map',
        meta:{
            permission:[]
        },
        component: () => import(/* webpackChunkName: 'example' */ '../page/example/map')
    },
    {
        path: '/i18n',
        meta:{
            permission:[]
        },
        component: () => import(/* webpackChunkName: 'i18n' */ '../page/i18n')
    },
    {
        path: '/theme',
        meta:{
            permission:[]
        },
        component: () => import(/* webpackChunkName: 'themeChange' */ '../page/themeChange')
    }
]

const redirectRoute = [
    {
        path: '*',
        redirect: '/error/404'
    }
]

export { asyncLayout, asyncRoute, redirectRoute}