/**
 * Created by lidy on 2016/12/17.
 */
const path = require('path')
const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const favicon = require('serve-favicon')
const partials = require('express-partials');
const app = express()
const isDev = true||process.env.NODE_ENV === 'development'
const defaultPort = isDev? 4000 : 8300
const port = process.env.PORT || defaultPort
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')))
app.use(cookieParser());
app.use(partials());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));
app.set('views', './views')
app.set('view engine', 'ejs')
app.use('/assets', express.static('public')); //静态资源
app.use('/dist', express.static('dist'));

require('./dist/routes')(app);

app.listen(port, function(err) {
    if (err) {
        console.error(err)
    } else {
        console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
    }
})