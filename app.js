var path = require('path');

var express = require('express');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var partials = require('express-partials');
var bodyParser = require('body-parser');
var session = require('express-session');
var methodOverride = require('method-override');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var multer = require('multer');
var app = express();
app.use(bodyParser.urlencoded({extended: false})) //参数处理嵌套
var routes = require('./routes/index');
var upload = require('./routes/upload');
var api = require('./routes/api/');
var settings = require('./settings');

var fs = require('fs');
var accessLog = fs.createWriteStream('access.log', {flags: 'a'});
var errorLog = fs.createWriteStream('error.log', {flags: 'a'});
var port = 3000;
app.use(session({
    secret: settings.cookieSecret,
    key: settings.db,//cookie name
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
    store: new MongoStore({
        // db: settings.db,
        host: settings.host,
        port: settings.port,
        url: 'mongodb://localhost/blog'
    })
}));
app.use(flash());
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(favicon(__dirname + '/src/images/favicon.ico'));
app.use(logger('dev'));
app.use(logger({stream: accessLog}));
app.use(partials());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use('/assets', express.static('public'));
app.use('/dist', express.static('dist'));
//app.use(express.static(path.join(__dirname, 'public')));
app.use('/upload', upload);
app.use('/api', api.account);
app.use('/api', api.article);
app.use('/api', api.archive);
app.use('/api', api.comment);
app.use('/api', api.search);
app.use('/api', api.link);
app.use('/api', api.tag);
routes(app);


// app.use(function (err, req, res, next) {
//         var meta = '[' + new Date() + '] ' + req.url + '\n';
//         errorLog.write(meta + err.stack + '\n');
//         next();
// });
app.use(methodOverride()); //路由:name:title
app.use(function (err, req, res, next) {
    // 业务逻辑
    console.error(err.stack);
    next(err);
});
var isDev = false && process.env.NODE_ENV !== 'production';
if (isDev) {
    //webapck
    var webpack = require('webpack'),
        webpackDevMiddleware = require('webpack-dev-middleware'),
        webpackHotMiddleware = require('webpack-hot-middleware'),
        webpackDevConfig = require('./webpack.config.js');

    var compiler = webpack(webpackDevConfig);

    app.use(webpackDevMiddleware(compiler, {
        publicPath: webpackDevConfig.output.publicPath,
        noInfo: true,
        stats: {
            colors: true
        }
    }));
    app.use(webpackHotMiddleware(compiler));
    var bs = require('browser-sync').create();
    app.listen(port, function () {
        bs.init({
            open: false,
            ui: false,
            notify: false,
            proxy: 'localhost:3000',
            files: ['./views/**'],
            port: 8080
        });
        console.log('App (dev) is going to be running on port 8080 (by browsersync).');
    });
}
else {
    app.listen(app.get('port'), function () {
        console.log('Express server listening on port ' + app.get('port'));
    });
}