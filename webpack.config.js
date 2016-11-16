'use strict';
//引用模块
var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');//加样式游览器兼容前缀
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require("path");
var srcDir = path.resolve(process.cwd(), 'src');
var nodeModPath = path.resolve(__dirname, './node_modules');
var publicPath = 'http://localhost:3000/';
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';
//打包入口
var entries = {
    "pages/index": [
        'webpack/hot/dev-server', //热部署插件
        'webpack-hot-middleware/client?reload=true',//热部署中间件
        './src/js/pages/index.js'
    ],
    base: [
        './src/css/bootstrap-grid.css',
        './src/css/font-awesome.css',
        './src/css/animate.css',
        './src/less/theme.less'
    ]
};
module.exports = {
    devtool: 'source-map',//cheap-module-eval-source-map,eval,cheap-module-source-map,source-map
    // context: path.join(__dirname, 'app', 'js'),

    entry: entries,

    output: {
        path: __dirname + '/dist',
        filename: 'js/[name].js',
        chunkFilename: '[id].chunk.js',
        publicPath: publicPath
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DllReferencePlugin({
            context: __dirname,
            //在这里引入 manifest 文件
            manifest: require('./dist/js/vendor-manifest.json')
        }),
        new ExtractTextPlugin("css/[name].css")
        // new ExtractTextPlugin('css/[name].less')
    ],
    module: {
        // noParse:[path.join(__dirname, '../node_modules/react/dist/react.min.js'),path.join(__dirname, '../node_modules/react-dom/dist/react-dom.min.js')],
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loaders: ['react-hot', 'babel'] // 'babel-loader' is also a valid name to reference
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style', 'css!less'),
                include: [
                    path.join(__dirname, 'src')
                ]
            },
            {
                test: /\.(gif|jpg|png)\??.*$/,
                loader: 'url-loader?limit=50000&name=images/[name].[ext]'
            },
            {
                test: /\.(woff|woff2|svg|eot|ttf|otf)\??.*$/,
                loader: 'url-loader?limit=50000&name=font/[name].[ext]'
            }
        ]
    },
    // resolve: {
    //     extensions: ['', '.js'],
    //     root: [srcDir, nodeModPath],
    //     alias: {
    //
    //     },
    //     publicPath: '/'
    // },
    resolveLoader: {
        root: path.join(__dirname, '../node_modules')
    },
    postcss: [autoprefixer({browsers: ['> 1%', 'last 2 versions']})]
};
