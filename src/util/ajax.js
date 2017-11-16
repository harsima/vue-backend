/**
 * axios全局配置，包括验证校验及错误处理
 */
import axios from 'axios'
import store from '../store'
import router from '../router'

// 超时设置
const service = axios.create({
  timeout: 5000                  // 请求超时时间
});
// baseURL
// axios.defaults.baseURL = 'https://api.github.com';

// http request 拦截器
// 每次请求都为http头增加Authorization字段，其内容为token
service.interceptors.request.use(
    config => {
        if (store.state.user.token) {
            config.headers.Authorization = `token ${store.state.user.token}`;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// http response 拦截器
// 针对响应代码确认跳转到对应页面
service.interceptors.response.use(
    response => response,
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    router.push('error/401');
                case 403:
                    router.push('error/403');
            }
        }
        // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
        return Promise.reject(error.response.data)
    }
);

export default service;