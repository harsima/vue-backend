'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

const webpackConfig = merge(baseWebpackConfig, {
    entry: {
        'theme-dark': './src/assets/css/theme-dark.scss',
        'theme-default': './src/assets/css/theme-default.scss'
    },
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.build.productionSourceMap
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
        minimize: true,
        runtimeChunk: true,
        splitChunks: {
            // chunks: "async",
            // maxAsyncRequests: 5,
            // maxInitialRequests: 3,
            chunks: 'all',
            minSize: 0,
            maxAsyncRequests: Infinity,
            maxInitialRequests: Infinity,
            name: true,
            cacheGroups: {
                default: {
                    chunks: 'async',
                    maxAsyncRequests: 5,
                    maxInitialRequests: 3,
                    priority: -20,
                    reuseExistingChunk: true,
                },
                css: {
                    name: function(el){
                        console.log(el)
                        return utils.assetsPath('css/'+ el.name +'.'+ el.hash +'.css')
                    },
                    test: /\.(css|sass|scss|less)(\?.*)?$/,
                    chunks: 'all'
                },
                echarts: {
                    name: 'echarts',
                    enforce: true,
                    test: function(module){
                        var context = module.context;
                        return context && (context.indexOf('echarts') >= 0 || context.indexOf('zrender') >= 0)
                    }
                },
                vendors: {
                    name: 'vendors',
                    enforce: true,
                    test: function(module){
                        return (
                            module.resource &&
                            /\.js$/.test(module.resource) &&
                            module.resource.indexOf(
                                path.join(__dirname, '../node_modules')
                            ) === 0
                        )
                    },
                    chunks: "all"
                }
                
                // commons: {
                //     test: /[\\/]node_modules[\\/]/,
                //     name: "vendors",
                //     chunks: "all"
                // }
            }
        }
    },
    plugins: [
        // extract css into its own file
        // new ExtractTextPlugin({
        //     filename: utils.assetsPath('css/[name].[contenthash:7].css')
        // }),
        // Compress extracted CSS. We are using this plugin so that possible
        // duplicated CSS from different components can be deduped.
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true
            }
        }),
        // generate dist index.html with correct asset hash for caching.
        // you can customize output by editing /index.html
        // see https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: config.build.index,
            template: './src/index.html',
            inject: true,
            // minify: {
            //   removeComments: true,
            //   collapseWhitespace: true,
            //   removeAttributeQuotes: true
            //   // more options:
            //   // https://github.com/kangax/html-minifier#options-quick-reference
            // },
            minify: false,
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            chunksSortMode: 'dependency',
            excludeChunks: ['theme-default', 'theme-dark']
        }),
        // keep module.id stable when vender modules does not change
        new webpack.HashedModuleIdsPlugin(),
        // split vendor js into its own file
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor',
        //     minChunks: function(module) {
        //         // any required modules inside node_modules are extracted to vendor
        //         return (
        //             module.resource &&
        //             /\.js$/.test(module.resource) &&
        //             module.resource.indexOf(
        //                 path.join(__dirname, '../node_modules')
        //             ) === 0
        //         )
        //     }
        // }),
        // split echarts into its own file
        // new webpack.optimize.CommonsChunkPlugin({
        //     async: ['echarts'],
        //     minChunks(module) {
        //         var context = module.context;
        //         return context && (context.indexOf('echarts') >= 0 || context.indexOf('zrender') >= 0);
        //     }
        // }),
        // extract webpack runtime and module manifest to its own file in order to
        // prevent vendor hash from being updated whenever app bundle is updated
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'manifest',
        //     chunks: ['vendor']
        // }),
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