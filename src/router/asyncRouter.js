// 需要权限访问的完整路由表
// 获取权限后和该表匹配的则被加入到正式路由中。该表必须完整的包含工程页面
// path 页面跳转地址
// permission字段内容从后台获取，代表该页内部详细权限，以key:value形式存储

const asyncRouter = [
    {
        path: '/asyncRouter',
        component: r => require.ensure([], () => r(require('../page/layout/layout')), 'layout'),
        children: []
    },
    {
        path: '/table',
        meta:{
            permission:[]
        },
        component: r => require.ensure([], () => r(require('../page/table/table')), 'table')
    },
    {
        path: '/form',
        meta:{
            permission:[]
        },
        component: r => require.ensure([], () => r(require('../page/form/form')), 'form'),
    },
    {
        path: '/components',
        meta:{
            permission:[]
        },
        component: r => require.ensure([], () => r(require('../page/components/index')), 'sysComponents'),
    },
    {
        path: '/components/permission',
        meta:{
            permission:[]
        },
        component: r => require.ensure([], () => r(require('../page/components/function/permission')), 'sysComponents'),
    },
    {
        path: '/components/pageTable',
        meta:{
            permission:[]
        },
        component: r => require.ensure([], () => r(require('../page/components/function/pageTable')), 'sysComponents'),
    },
    {
        path: '/components/pageSearch',
        meta:{
            permission:[]
        },
        component: r => require.ensure([], () => r(require('../page/components/ui/pageSearch')), 'sysComponents'),
    },
    {
        path: '/components/pageSection',
        meta:{
            permission:[]
        },
        component: r => require.ensure([], () => r(require('../page/components/ui/pageSection')), 'sysComponents'),
    },
    {
        path: '/components/pageTitle',
        meta:{
            permission:[]
        },
        component: r => require.ensure([], () => r(require('../page/components/ui/pageTitle')), 'sysComponents'),
    },
    {
        path: '/components/pageToolbar',
        meta:{
            permission:[]
        },
        component: r => require.ensure([], () => r(require('../page/components/ui/pageToolbar')), 'sysComponents'),
    },
    {
        path: '/components/pageNotes',
        meta:{
            permission:[]
        },
        component: r => require.ensure([], () => r(require('../page/components/assist/pageNotes')), 'sysComponents'),
    },
    {
        path: '/example/table',
        meta:{
            permission:[]
        },
        component: r => require.ensure([], () => r(require('../page/example/table')), 'example'),
    },
    {
        path: '/example/charts',
        meta:{
            permission:[]
        },
        component: r => require.ensure([], () => r(require('../page/example/charts/charts')), 'example'),
    },
    {
        path: '/example/map',
        meta:{
            permission:[]
        },
        component: r => require.ensure([], () => r(require('../page/example/map/map')), 'example'),
    },
    {
        path: '/i18n',
        meta:{
            permission:[]
        },
        component: r => require.ensure([], () => r(require('../page/i18n/i18n')), 'i18n'),
    },
    {
        path: '/theme',
        meta:{
            permission:[]
        },
        component: r => require.ensure([], () => r(require('../page/themeChange/themeChange')), 'theme'),
    }
    
]

export default asyncRouter
