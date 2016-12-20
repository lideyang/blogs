'use strict';
//引用模块
var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');//加样式游览器兼容前缀
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require("path");
var config = require("./src/config");
var publicPath = config.ImageHost + 'dist/';
var entryBase = ['webpack-hot-middleware/client?reload=true']; //热部署中间件
var pageStr = __dirname + '/src/js/pages';
var entries = {};
var walk = function (src) { //递归遍历pages目录所有文件
    var dirList = fs.readdirSync(src);
    dirList.forEach(function (item) {
        if (fs.statSync(src + '/' + item).isDirectory()) {
            walk(src + '/' + item);
        } else {
            if (item !== 'index.js') {
                var entryPath = './src/js/pages/' + item;
                var jsName = item.substring(0, item.lastIndexOf('.'));
                entries['pages/' + jsName] = entryBase.concat(entryPath);
            }
        }
    });
}
walk(pageStr);
var baseStyle = [
    './src/less/bootstrap/bootstrap.less',
    './src/less/theme.less',
    './public/fonts/iconfont.css',
    './src/less/fonts.less'
];
baseStyle.unshift(entryBase[0]);
entries['base'] = baseStyle;
module.exports = {
    devtool: 'source-map',//cheap-module-eval-source-map,eval,cheap-module-source-map,source-map
    // context: path.join(__dirname, 'app', 'js'),

    entry: entries,

    output: {
        path: '/',
        filename: 'js/[name].js',
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
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: './js/common.js',
            minChunks: 2
        }),
        new ExtractTextPlugin("css/[name].css"),
        new ExtractTextPlugin('css/[name].less'),
        new webpack.DefinePlugin({
            __DEVCLIENT__: true,
            __DEVSERVER__: false,
            __DEVTOOLS__: false,
            __DEVLOGGER__: true,
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        })
    ],
    module: {
        // noParse:[path.join(__dirname, '../node_modules/react/dist/react.min.js'),path.join(__dirname, '../node_modules/react-dom/dist/react-dom.min.js')],
        loaders: [
            {
                test: /\.js[x]?$/,
                exclude: /(node_modules)/,
                loader: ['babel-loader'], // 'babel-loader' is also a valid name to reference
                query: {
                    presets: ["es2015", "react", "stage-1"],
                    plugins: ['transform-decorators-legacy']
                },
                include: [
                    path.join(__dirname, 'src')
                ]
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap")
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style', 'css!less?sourceMap'),
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
                loader: 'url-loader?limit=50000&name=fonts/[name].[ext]'
            }
        ]
    },
    postcss: [autoprefixer({browsers: ['> 1%', 'last 2 versions']})]
};