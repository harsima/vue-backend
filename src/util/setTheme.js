/**
 * 根据fileName获取匹配CSS文件地址列表
 * @param {Array} cssList CSS文件列表
 * @param {String} name 文件名
 */
function getFileList(cssList, name){
    var matchFileList = []
    for(var i = 0; i < cssList.length; i++){
        var url = cssList[i]
        var fileName = url.substring(url.lastIndexOf("/")+1)
        // 可匹配[fileName].css 
        // [fileName]-[themeType].css 
        // [fileName]-[themeType].[hash]css 等
        var reg = new RegExp("^"+ name + "(\\-\\w+)*(\\.\\w+)*\\.css$")
        if(reg.test(fileName)) {
            matchFileList.push(url)
        }
    }
    return matchFileList
}

/**
 * 设置主题文件
 * @param {String} fileName 主题名
 */
function setTheme(fileName){
    // 获取head中的外链样式表组
    var domHead = document.getElementsByTagName('HEAD').item(0),
        styleList = domHead.querySelectorAll("link[rel='stylesheet']"),
        urlList = [],
        themeList = []

    for(var i = 0; i < styleList.length; i++){
        urlList.push(styleList[i].getAttribute("href"))
    }
        
    // 获取已加载的主题文件列表
    themeList = getFileList(urlList, fileName.split("-")[0])

    // 如果head中的样式表中没有对应的文件则向head中写入file
    if(window.themeURL){
        // 删除其他主题文件
        themeList.forEach(el => {
            if(window.themeURL.indexOf(el) >= 0){
                var item = document.querySelectorAll(`link[href="${el}"]`)[0]
                item.parentNode.removeChild(item)
            }
        })
        // 插入新style
        var style = document.createElement("link");
        var matchFileURL = getFileList(window.themeURL, fileName)
        if(matchFileURL.length > 1 || matchFileURL.length < 0){
            console.error("主题文件的文件名格式错误，出现多个或没有样式文件！")
            return
        }
        style.href = matchFileURL[0]
        style.rel = 'stylesheet'
        style.type = 'text/css'
        domHead.appendChild(style)
    }
}
export default setTheme