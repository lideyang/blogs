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
var publicPath = 'http://localhost:3000/dist/';
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';
console.log(__dirname);
//打包入口
var entries = {
    "pages/index": [
        './src/js/pages/index.js',
       // 'webpack/hot/dev-server', //热部署插件
        'webpack-hot-middleware/client?reload=true'//热部署中间件
    ],
    "pages/article": [
        './src/js/pages/article.js',
        // 'webpack/hot/dev-server', //热部署插件
        'webpack-hot-middleware/client?reload=true'//热部署中间件
    ],
    "vue/test": [ //vue测试
        './src/vue/test.js',
        // 'webpack/hot/dev-server', //热部署插件
        'webpack-hot-middleware/client?reload=true'//热部署中间件
    ],
    base: [
        './src/css/bootstrap.css',
        './src/css/font-awesome.css',
        './src/css/animate.css',
        './src/less/theme.less',
        'webpack-hot-middleware/client?reload=true'//热部署中间件
    ]
};
module.exports = {
    devtool: 'source-map',//cheap-module-eval-source-map,eval,cheap-module-source-map,source-map
    // context: path.join(__dirname, 'app', 'js'),

    entry: entries,

    output: {
        path: path.resolve(__dirname, './dist'),
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
        // 提供公共代码
        new webpack.optimize.CommonsChunkPlugin('js/common.js'),
        new ExtractTextPlugin("css/[name].css")
        // new ExtractTextPlugin('css/[name].less')
    ],
    module: {
        // noParse:[path.join(__dirname, '../node_modules/react/dist/react.min.js'),path.join(__dirname, '../node_modules/react-dom/dist/react-dom.min.js')],
        loaders: [
            {
                test: /\.js[x]?$/,
                exclude: /(node_modules|bower_components)/,
                loaders: ['babel-loader?presets[]=es2015&presets[]=react'], // 'babel-loader' is also a valid name to reference
                include: [
                    path.join(__dirname, 'src')
                ]
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
