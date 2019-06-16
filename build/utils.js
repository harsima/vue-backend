'use strict'
const path = require('path')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.assetsPath = function(_path) {
    const assetsSubDirectory = process.env.NODE_ENV === 'production' ?
        config.build.assetsSubDirectory :
        config.dev.assetsSubDirectory
    return path.posix.join(assetsSubDirectory, _path)
}

exports.keepAssetsPath = function(opt) {
    const assetsSubDirectory = process.env.NODE_ENV === 'production' ?
        config.build.assetsSubDirectory :
        config.dev.assetsSubDirectory
    
    const relPath = path.relative(opt.assetsPath, opt.file)
    let subPath = path.dirname(relPath)
    subPath = subPath.split(path.sep).join("/")
    return path.posix.join(assetsSubDirectory, subPath, opt.name)
}

exports.cssLoaders = function(options) {
    options = options || {}

    const cssLoader = {
        loader: 'css-loader',
        options: {
            minimize: process.env.NODE_ENV === 'production',
            sourceMap: options.sourceMap
        }
    }

    // generate loader string to be used with extract text plugin
    function generateLoaders(loader, loaderOptions) {
        let loaders = cssLoader
        if (loader) {
            loaders = {
                loader: loader + '-loader',
                options: Object.assign({}, loaderOptions, {
                    sourceMap: options.sourceMap
                })
            }
            // loaders.push({
            //     loader: loader + '-loader',
            //     options: Object.assign({}, loaderOptions, {
            //         sourceMap: options.sourceMap
            //     })
            // })
        } else{
            return []
        }

        // Extract CSS when that option is specified
        // (which is the case during production build)
        if (options.extract) {
            return ExtractTextPlugin.extract({
                use: [loaders, 'postcss-loader'],
                fallback: 'vue-style-loader',
                publicPath: '../../'
            })
        } else {
            // return ['vue-style-loader'].concat(loaders)
            return [loaders]
        }
    }

    // https://vue-loader.vuejs.org/en/configurations/extract-css.html
    return {
        css: generateLoaders(),
        postcss: generateLoaders(),
        less: generateLoaders('less'),
        sass: generateLoaders('sass', { indentedSyntax: true }),
        scss: generateLoaders('sass'),
        stylus: generateLoaders('stylus'),
        styl: generateLoaders('stylus')
    }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function(options) {
    const output = []
    const loaders = exports.cssLoaders(options)
    for (const extension in loaders) {
        const loader = loaders[extension]
        const extLoader = ['vue-style-loader', 'css-loader']

        output.push({
            test: new RegExp('\\.' + extension + '$'),
            use: extLoader.concat(loader, ['postcss-loader'])
        })
    }
    return output
}