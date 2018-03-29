// 根据name匹配列表中的URL
function matchFileName(list, name, callback){
    for(var i = 0; i < list.length; i++){
        var el = list[i]
        var fileName = el.substring(el.lastIndexOf("/")+1)
        var reg = new RegExp("^"+ name + "(\\.\\w+)*\\.css$")
        if(reg.test(fileName)) {
            if(callback) {
                callback(el)
            }
            return false
        }
    }
}

function changeStyle(file){
    // 获取head中的外链样式表组
    var domHead = document.getElementsByTagName('HEAD').item(0),
        styleList = domHead.querySelectorAll("link[rel='stylesheet']"),
        urlList = [],
        hasFile = false;

    // 生成当前加载的css地址数组
    for(var i = 0; i < styleList.length; i++){
        urlList.push(styleList[i].getAttribute("href"))
    }

    // 判断是否有匹配的文件
    matchFileName(urlList, file, function(){
        hasFile = true
    })

    // 如果head中的样式表中没有对应的文件则向head中写入file
    if(!hasFile && window.themeURL){
        // 删除其他主题文件
        urlList.forEach(el => {
            if(window.themeURL.indexOf(el) >= 0){
                var item = document.querySelectorAll(`link[href="${el}"]`)[0]
                item.parentNode.removeChild(item)
            }
        })
        // 插入新style
        var style = document.createElement("link");
        matchFileName(window.themeURL, file, function(el){
            style.href = el
        })
        style.rel = 'stylesheet'
        style.type = 'text/css'
        domHead.appendChild(style)
    }
}
export default changeStyle