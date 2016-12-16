const path = require('path');
const express = require('express');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const partials = require('express-partials');
const bodyParser = require('body-parser');
const session = require('express-session');
const methodOverride = require('method-override');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const app = express();
app.use(bodyParser.urlencoded({extended: false})) //参数处理嵌套
const routes = require('./routes/index');
const upload = require('./routes/upload');
const api = require('./routes/api/');
const settings = require('./settings');
const reactView = require('./server/reactview/app.js');
const fs = require('fs');
const accessLog = fs.createWriteStream('access.log', {flags: 'a'});
const errorLog = fs.createWriteStream('error.log', {flags: 'a'});
const port = 3000;
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
// 注入reactview
const viewpath = path.join(__dirname, 'src/js/pages');

app.config = {
    reactview: {
        viewpath: viewpath, // the root directory of view files
        doctype: '<!DOCTYPE html>',
        extname: '.js', // view层直接渲染文件名后缀
        beautify: false, // 是否需要对dom结构进行格式化
        writeResp: false, // 是否需要在view层直接输出
    }
};
// 为app提供服务端渲染的能力
reactView(app);

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