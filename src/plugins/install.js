// 组件全局注册
import Vue from 'vue'

import hasPermission from './hasPermission'

const Plugins = [
    hasPermission
]

// 注册插件
Plugins.map((plugin) => {
    Vue.use(plugin)
})

export default Vue