import Mock from 'mockjs'
import navlist from './navlist'
import login from './login'
import echarts from './echarts'
// import {datasource} from './datasource.js';

let data = [].concat(navlist, login, echarts)

data.forEach(function(res){
    Mock.mock(res.path, res.data)
})

export default Mock