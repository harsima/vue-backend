'use strict'
const utils = require('./utils')
const config = require('../config')
const merge = require('webpack-merge')
const isProduction = process.env.NODE_ENV === 'production'

const cssLoaders = utils.cssLoaders({
    sourceMap: isProduction ?
        config.build.productionSourceMap :
        config.dev.cssSourceMap,
    extract: isProduction
})
const extendLoaders = {
    i18n: '@kazupon/vue-i18n-loader'
}

module.exports = {
    loaders: merge(cssLoaders, extendLoaders),
    transformToRequire: {
        video: 'src',
        source: 'src',
        img: 'src',
        image: 'xlink:href'
    }
}