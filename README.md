# Vue + ElementUI 后台管理系统框架

>本框架为后台管理类系统解决方案，其中包含很多后台管理中的必备功能。当前版本仅供学习交流，框架中vue及webpack版本会随时更新，尽量采用平滑升级策略，修改部分全局或打包配置完成，如果更改过大，版本号将自动增加，并提供之前版本的release，所以如果注重稳定的话，请在生产环境中谨慎使用。

## **功能列表**
- 登录登出
- 菜单异步加载
- 页面详细权限控制
- 多语言支持
- 布局切换
- 高德地图集成
- Echarts集成
- 错误页面
- mock数据
- 页面加载进度条

## **项目使用**
``` bash
# 安装项目依赖
npm install

# 开启本地服务，默认为localhost:9000
npm run dev

# 项目打包，构建生产环境
npm run build

# 打包过程中想查看具体报告则可以通过以下命令实现
npm run build --report
```


## **项目结构**
本项目的开发代码目录结构如下，在编码时请按照规则放置代码

``` bash
./root
├── ...
│   ├── mock/                               // 模拟请求
├── src                                     
│   ├── components                          
│   │   ├── platformCom                     // 平台通用组件
│   │   │   ├── ...
│   │   │   ├── install.js                  // 平台组件全局注册
│   │   ├── customCom                       // 项目组件
│   │   │   ├── global/                     // 项目全局组件
│   │   │   │   ├── ...     
│   │   │   │   ├── install.js              // 项目全局组件安装
│   │   │   ├── locale/                     // 项目局部组件
│   ├── lang                                // 国际化文件
│   │   ├── en.js                           
│   │   ├── zh-cn.js
│   │   ├── ...
│   ├── page                                // 项目页面
│   │   ├── ...                             // 页面名称
│   │   │   ├── *.vue                       // vue文件
│   │   │   ├── ...                                                  
│   ├── util                                // 通用工具
│   │   ├── http.js                         // ajax全局设置
│   │   ├── i18n.js                         // 国际化全局设置
│   │   ├── amap.js                         // 高德地图注册
│   │   ├── ...
│   ├── store                               // vuex状态管理
│   │   ├── modules/                        // vuex的modules
│   │   ├── state.js                        
│   │   ├── getter.js                       
│   │   ├── mutations.js                    
│   │   ├── actions.js                      
│   │   ├── store.js                        
│   ├── router
│   │   ├── asyncRoute.js                   // 异步路由表
│   │   ├── staticRoute.js                  // 静态路由
│   │   ├── whiteList.js                    // 无需权限访问白名单
│   │   ├── index.js                        // vue-router路由配置
│   ├── index.html                          // 单文件入口渲染模板
│   ├── index.vue                           // 首页vue
│   ├── main.js                             // webpack入口文件
├── ...
```

## 其他
欢迎反馈及探讨各种问题，同时请注意issue规则