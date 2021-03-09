var data = [
    {
        path: "/home",
        name: "我的工作台",
    },
    {
        name: "业务中心",
        child: [
            {
                name: "介绍",
                path: "/components",
            },
            {
                name: "功能类",
                child: [
                    {
                        path: "/components/permission",
                        name: "详细鉴权",
                    },
                    {
                        path: "/components/pageTable",
                        name: "表格分页",
                    },
                ],
            },
            {
                name: "布局类",
                child: [
                    {
                        path: "/components/pageTitle",
                        name: "页面标题",
                    },
                    {
                        path: "/components/pageSection",
                        name: "子区域",
                    },
                    {
                        path: "/components/pageSearch",
                        name: "搜索条",
                    },
                    {
                        path: "/components/pageToolbar",
                        name: "工具条",
                    },
                ],
            },
            {
                name: "辅助类",
                child: [
                    {
                        path: "/components/pageNotes",
                        name: "引用说明",
                    },
                ],
            },
        ],
    },
    {
        name: "消息中心",
        child: [
            {
                path: "/example/table",
                name: "列表页面",
                permission: ["edit"],
            },
            {
                path: "/example/charts",
                name: "图表页面",
            },
            {
                path: "/example/map",
                name: "地图页面",
            },
        ],
    },
    {
        path: "/i18n",
        name: "待办中心",
    },
    {
        path: "/theme",
        name: "授权中心",
    },
];

export default [
    {
        path: "/user/navlist",
        data: data,
    },
];
