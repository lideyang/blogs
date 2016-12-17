/**
 * Created by Lidy on 2016/12/16.
 */
var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
require("babel-polyfill");

module.exports = {
    entry: path.resolve(__dirname, 'server.js'),
    output: {
        filename: 'server.bundle.js',
        path: path.resolve(__dirname, '')
    },
    plugins: [
        new webpack.DefinePlugin({
            'isServer': true,
            'isClient': false
        })
    ],
    target: 'node',
    // keep node_module paths out of the bundle
    externals: fs.readdirSync(path.resolve(__dirname, './node_modules')).concat([
        'react-dom/server', 'react/addons',
    ]).reduce(function (ext, mod) {
        ext[mod] = 'commonjs ' + mod;
        return ext;
    }, {}),
    node: {
        __filename: true,
        __dirname: true
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react', 'stage-1'],
                    plugins: [
                        'transform-decorators-legacy',
                        'transform-runtime'
                    ]
                }
            },
            {
                test: /\.(gif|jpg|png)\??.*$/,
                loader: 'url-loader?limit=50000&name=images/[name].[ext]'
            }
        ]
    },
    resolveLoader: {
        root: path.join(__dirname, '/node_modules')
    },
};