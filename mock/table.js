export default{
    path: '/tableData',
    data: {
        head: [
            {
                key: 'name',
                name: '姓名'
            },
            {
                key: 'sex',
                name: '性别'
            },
            {
                key: 'age',
                name: '年龄'
            },
            {
                key: 'address',
                name: '地址'
            },
            {
                key: 'email',
                name: '邮件'
            },
            {
                key: 'remark',
                name: '备注'
            }
        ],
        body: [
            {
                'name': '@cname',
                'sex|1': ["男", "女"],
                'age': '@natural(18, 60)',
                'address': '@city(true) ',
                'email': '@email()',
                'remark': '@cparagraph(1)',
                operation: 'edit,delete'
            },
            {
                'name': '@cname',
                'sex|1': ["男", "女"],
                'age': '@natural(18, 60)',
                'address': '@city(true)',
                'email': '@email()',
                'remark': '@cparagraph(1)',
                operation: 'edit,delete'
            },
        ]
    }
}