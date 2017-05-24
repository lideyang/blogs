/**
 * Created by lidy on 2016/12/17.
 */
const path = require('path')
const express = require('express')
const cookieParser = require('cookie-parser')
const favicon = require('serve-favicon')
const partials = require('express-partials');
var logger = require('morgan');
var fs = require('fs')
const app = express()
const isDev = true||process.env.NODE_ENV === 'development'
const defaultPort = isDev? 4000 : 8300
const port = process.env.PORT || defaultPort
var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'})
// setup the logger
app.use(logger('combined', {stream: accessLogStream}))
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')))
app.use(cookieParser());
app.use(partials());
app.set('views', './views')
app.set('view engine', 'ejs')
app.use('/assets', express.static('public')); //静态资源
app.use('/dist', express.static('dist'));
require('./dist/routes')(app);
app.use(function(err, req, res, next) {
    // 业务逻辑
    console.error(err.stack);
    next(err);
});
app.listen(port, function(err) {
    if (err) {
        console.error(err)
    } else {
        console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
    }
})