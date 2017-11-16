export default {
    load(callback){
        if (window.AMap){
            callback()
        } else{
            // 载入高德地图和UI组件
            var script = document.createElement('script')
            script.type = 'text/javascript'
            script.async = true
            script.src = 'https://webapi.amap.com/maps?v=1.4.1&key=4e4c8706ad7f1d468011d7b1d2340bf2&callback=initAmap'
            document.body.appendChild(script)
            window.initAmap = () =>{
                callback()
            }
        }
    },
    defaultOption: {
        center: [116.397428, 39.90923],
        resizeEnable: true,
        zoom: 10
    }
}