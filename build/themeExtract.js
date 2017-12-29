const fs = require('fs')
const path = require('path')
const config = require('../config')
const utils = require('./utils')
const cssPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory, 'css/')
const cheerio = require('cheerio')
const chalk = require('chalk')

// 不需要进行查询的文件列表
const excludeFile = ['app.css']

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

/**
 * 获取生成目录中的css文件名
 * @param startPath  
 * @returns {Array}
 */
function findSync(startPath) {
    let result = [];

    function finder(fullPath) {
        let files = fs.readdirSync(fullPath);
        files.forEach((val, index) => {
            let fPath = path.join(fullPath, val);
            let stats = fs.statSync(fPath);
            // 如果是文件夹则继续查找
            if (stats.isDirectory()) {
                finder(fPath);
            };
            // 如果是CSS文件并且不在exclude列表中
            if (stats.isFile() && path.extname(fPath) == ".css") {
                var fileName = val.substring(0, val.indexOf(".")) + ".css"
                if(excludeFile.indexOf(fileName) < 0){
                    let relativePath = config.build.assetsPublicPath + path.posix.join(config.build.assetsSubDirectory, "/css", val);
                    result.push(relativePath)
                }
            }
        });

    }
    finder(startPath);
    return result;
}

// findSync(cssPath)

function extractCss() {
    fs.readFile(config.build.index, 'utf8', (err, data) => {
        if (err) {
            throw err
        }
        const $ = cheerio.load(data)
        const cssUrls = findSync(cssPath)

        //插入行内js
        // console.log(cssUrls)
        $('head').append(`<script>var themeURL = ${JSON.stringify(cssUrls)}</script>`)

        fs.writeFile(config.build.index, $.html(), err => {
            if (err) {
                throw err
            }
            console.log(chalk.cyan('  css theme rewrite complete.\n'))
        })
    })
}
extractCss()