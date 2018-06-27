'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

function recursiveIssuer(m) {
    if (m.issuer) {
      return recursiveIssuer(m.issuer);
    } else if (m.name) {
      return m.name;
    } else {
      return false;
    }
}

const webpackConfig = merge(baseWebpackConfig, {
    entry: {
        'theme-dark': './src/assets/css/theme-dark.scss',
        'theme-default': './src/assets/css/theme-default.scss'
    },
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.build.productionSourceMap,
            extract: true
        })
    },
    devtool: config.build.productionSourceMap ? '#source-map' : false,
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name].[chunkhash:7].js'),
        chunkFilename: utils.assetsPath('js/[name].[chunkhash:7].js')
    },
    mode: "production",
    // 文件压缩及chunk分离
    // https://github.com/webpack/webpack/issues/6409
    // https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693
    optimization: {
        minimizer: [
            // js mini
            new UglifyJsPlugin({
              cache: true,
              parallel: true,
              sourceMap: config.build.productionSourceMap // set to true if you want JS source maps
            }),
            // css mini
            new OptimizeCSSPlugin({})
        ],
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: true,
            cacheGroups: {
                default: {
                    priority: -20,
                    reuseExistingChunk: true,
                },
                vendors: {
                    name: 'vendors',
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    chunks: "all"
                },
                themeDark: {
                    name: 'theme-dark',
                    test: (m,c,entry = 'theme-dark') => recursiveIssuer(m) === entry,
                    chunks: 'all'
                },
                themeDefault: {
                    name: 'theme-default',
                    test: (m,c,entry = 'theme-default') => recursiveIssuer(m) === entry,
                    chunks: 'all'
                },
                echarts: {
                    name: 'echarts',
                    chunks: 'all',
                    priority: 20,
                    test: function(module){
                        var context = module.context;
                        return context && (context.indexOf('echarts') >= 0 || context.indexOf('zrender') >= 0)
                    }
                }
            }
        }
    },
    plugins: [
        // extract css into its own file
        new MiniCssExtractPlugin({
            filename: utils.assetsPath('css/[name].[contenthash:7].css')
        }),
        // generate dist index.html with correct asset hash for caching.
        // you can customize output by editing /index.html
        // see https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: config.build.index,
            template: './src/index.html',
            inject: true,
            minify: false,
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            chunksSortMode: 'dependency',
            excludeChunks: ['theme-default', 'theme-dark']
        }),
        // keep module.id stable when vender modules does not change
        new webpack.HashedModuleIdsPlugin(),
        // copy custom static assets
        new CopyWebpackPlugin([
          {
            from: path.resolve(__dirname, '../static'),
            to: config.build.assetsSubDirectory,
            ignore: ['.*']
          }
        ])
    ]
})

if (config.build.productionGzip) {
    var CompressionWebpackPlugin = require('compression-webpack-plugin')

    webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                '\\.(' +
                config.build.productionGzipExtensions.join('|') +
                ')$'
            ),
            threshold: 10240,
            minRatio: 0.8
        })
    )
}

if (config.build.bundleAnalyzerReport) {
    var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig