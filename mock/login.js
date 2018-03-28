var data = {
    'login': '@boolean',
    'captcha': "@image('100x40', '#FFFFFF', 'captcha')",
    'message': '这里是登录提交后错误提示信息@increment',
    'uid': '@id',
    'name': '@cname',
    'token': '@guid'
}

export default [{
    path: '/login',
    data: data
}]