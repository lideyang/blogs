/**
 * Created by lidy on 2016/12/17.
 */
var path = require('path')
var express = require('express')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var serverRender = require('./dist/server.js')
var favicon = require('serve-favicon')

var app = express()
var isDev = true||process.env.NODE_ENV === 'development'
var defaultPort = isDev? 4000 : 8300
var port = process.env.PORT || defaultPort
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')))
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

app.use('/assets', express.static('public')); //静态资源
app.use('/dist', express.static('dist'));

app.get('/', function (req, res, next) {
    serverRender.default(req, res);
})

app.listen(port, function(err) {
    if (err) {
        console.error(err)
    } else {
        console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
    }
})