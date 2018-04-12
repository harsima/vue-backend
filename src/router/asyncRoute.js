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
        path: '/components',
        name: 'components',
        meta:{
            permission:[]
        },
        component: () => import(/* webpackChunkName: 'components' */ '../page/components')
    },
    {
        path: '/components/pageNotes',
        name: 'comPageNotes',
        meta:{
            permission:[]
        },
        component: () => import(/* webpackChunkName: 'components' */ '../page/components/assist/pageNotes')
    },
    {
        path: '/components/permission',
        name: 'comPermission',
        meta:{
            permission:[]
        },
        component: () => import(/* webpackChunkName: 'components' */ '../page/components/function/permission')
    },
    {
        path: '/components/pageTable',
        name: 'comPageTable',
        meta:{
            permission:[]
        },
        component: () => import(/* webpackChunkName: 'components' */ '../page/components/function/pageTable')
    },
    {
        path: '/components/pageSearch',
        name: 'comPageSearch',
        meta:{
            permission:[]
        },
        component: () => import(/* webpackChunkName: 'components' */ '../page/components/ui/pageSearch')
    },
    {
        path: '/components/pageSection',
        name: 'comPageSection',
        meta:{
            permission:[]
        },
        component: () => import(/* webpackChunkName: 'components' */ '../page/components/ui/pageSection')
    },
    {
        path: '/components/pageTitle',
        name: 'comPageTitle',
        meta:{
            permission:[]
        },
        component: () => import(/* webpackChunkName: 'components' */ '../page/components/ui/pageTitle')
    },
    {
        path: '/components/pageToolbar',
        name: 'comPageToolbar',
        meta:{
            permission:[]
        },
        component: () => import(/* webpackChunkName: 'components' */ '../page/components/ui/pageToolbar')
    },
    {
        path: '/example/table',
        name: 'table',
        meta:{
            permission:[]
        },
        component: () => import(/* webpackChunkName: 'example' */ '../page/example/table')
    },
    {
        path: '/example/charts',
        name: 'charts',
        meta:{
            permission:[]
        },
        component: () => import(/* webpackChunkName: 'example' */ '../page/example/charts')
    },
    {
        path: '/example/map',
        name: 'map',
        meta:{
            permission:[]
        },
        component: () => import(/* webpackChunkName: 'example' */ '../page/example/map')
    },
    {
        path: '/i18n',
        name: 'i18n',
        meta:{
            permission:[]
        },
        component: () => import(/* webpackChunkName: 'i18n' */ '../page/i18n')
    },
    {
        path: '/theme',
        name: 'theme',
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