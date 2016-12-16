var webpack = require('webpack');
var path = require('path');

var publicPath = 'http://localhost:3000/dist';
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';
console.log(path.resolve(__dirname, './dist'));
console.log( __dirname + '/dist');
var devConfig = {
    entry: {
        "client/page1": ['./client/page1', hotMiddlewareScript],
        page2: ['./client/page2', hotMiddlewareScript]
    },
    output: {
        //filename: './[name]/bundle.js',
        filename: 'client/js/[name].js',
        path: path.resolve(__dirname, './dist'),
        publicPath: publicPath
    },
    devtool: 'eval-source-map',
    module: {
        loaders: [{
            test: /\.(png|jpg)$/,
            loader: 'url?limit=8192&context=client&name=[path][name].[ext]'
        }, {
            test: /\.scss$/,
            loader: 'style!css?sourceMap!resolve-url!sass?sourceMap'
        }]
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};

module.exports = devConfig;
