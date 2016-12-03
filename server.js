var path = require('path')
var express = require('express')
var proxy = require("express-http-proxy")
var webpack = require('webpack')
var webpackConfig = require('./webpack.config.js')
// default port where dev server listens for incoming traffic
var port = 8080;
// Define HTTP proxies to your custom API backend

//proxy port:80
var hosts = "http://localhost:3000/";

var app = express()
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
        colors: true,
        chunks: false
    }
})

var hotMiddleware = require('webpack-hot-middleware')(compiler)


// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// app.get("/", function(req, res) {
//     res.sendFile(__dirname + '/index.html');
// });

//设置 proxy http://www.zdpin.cn =>配置host
var apiProxy = proxy(hosts, {
    forwardPath:function(req,res){
        return req._parsedUrl.path
    }
})

app.get("/*", apiProxy);
app.post("/*", apiProxy);

// serve pure static assets
// var staticPath = path.posix.join(config.build.assetsPublicPath, config.build.assetsSubDirectory)
// app.use(staticPath, express.static('./static'))

module.exports = app.listen(port, function (err) {
    if(err){
        return console.log(err)
    }
    console.log('Listening at http://localhost:' + port + '\n')
})
