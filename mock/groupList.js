export default {
    path: '/groupList',
    data: {
        key: 'accountInfo',
        name: '账号信息',
        leaf: 0,
        child: [
            {
                key: 'userInfo',
                name: '用户信息',
                leaf: 0,
                child: [
                    {
                        key: 'userBasic',
                        name: '基本信息',
                        leaf: 0,
                        child: [
                            {
                                key: 'userName',
                                name: '用户名',
                                leaf: 1
                            },
                            {
                                key: 'loginName',
                                name: '登录名',
                                leaf: 1
                            },
                            {
                                key: 'name',
                                name: '姓名',
                                leaf: 1
                            }
                        ]
                    }
                ]
            },
            {
                key: 'adminInfo',
                name: '管理员信息',
                leaf: 0,
                child: [
                    {
                        key: 'userBasic',
                        name: '基本信息',
                        leaf: 0,
                        child: [
                            {
                                key: 'userName',
                                name: '用户名',
                                leaf: 1
                            },
                            {
                                key: 'loginName',
                                name: '登录名',
                                leaf: 1
                            },
                            {
                                key: 'name',
                                name: '姓名',
                                leaf: 1
                            },
                            {
                                key: 'sex',
                                name: '性别',
                                leaf: 1
                            }
                        ]
                    }
                ]
            }
        ]
    }
}