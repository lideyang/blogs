var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    name: "server-side rendering",
    target: "node",
    node: {
        __filename: true,
        __dirname: true
    },
    entry: {
        server: ['babel-polyfill','./routes.js']
    },
    output: {
        path: './dist',
        filename: "routes.js",
        publicPath: "/",
        libraryTarget: "commonjs2"
    },
    plugins: [
        new webpack.DefinePlugin({
            __DEVCLIENT__: false,
            __DEVSERVER__: true,
            'process.env':{
                'NODE_ENV': JSON.stringify('development')
            }
        }),
    ],
    module: {
        loaders: [
            {
                test: /\.js$|\.jsx$/,
                loader: 'babel',
                query: {
                    "presets": ["es2015", "react", "stage-0"],
                    "plugins":["transform-decorators-legacy","syntax-async-functions"]
                },
                exclude: /node_modules/
            },
            {
                test: /\.json$/, loader: "json-loader"
            },
            {
                test: /\.css$/,
                loader: 'ignore-loader'
            },
            {
                test: /\.less$/,
                loader: 'ignore-loader'
            },
            {
                test: /\.(gif|jpg|png)\??.*$/,
                loader: 'ignore-loader'
            },
            {
                test: /\.(woff|woff2|svg|eot|ttf|otf)\??.*$/,
                loader: 'ignore-loader'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.css'],
        modulesDirectories: [
            "src", "node_modules"
        ]
    }
}