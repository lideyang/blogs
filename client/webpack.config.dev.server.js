var path = require('path')
var webpack = require('webpack')

module.exports = {
    name: "server-side rendering",
    target: "node",
    entry: {
        server: ['babel-polyfill','./src/server.js']
    },
    output: {
        path: './dist',
        filename: "server.js",
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
        new webpack.IgnorePlugin(/vertx/)
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
                include: path.join(__dirname,'src'),
                exclude: /node_modules/
            },
            {
                test: /\.json$/, loader: "json-loader"
            },
            {
                test: /\.(gif|jpg|png)\??.*$/,
                loader: 'url-loader?limit=50000&name=images/[name].[ext]'
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