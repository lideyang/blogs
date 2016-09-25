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

var routes = require('./routes/index');
var upload = require('./routes/upload');
var api = require('./routes/api');
var settings = require('./settings');

var fs = require('fs');
var accessLog = fs.createWriteStream('access.log', {flags: 'a'});
var errorLog = fs.createWriteStream('error.log', {flags: 'a'});

var app = express();
app.use('/upload', upload);
app.use('/api', api);
app.set('port', process.env.PORT || 3002);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(logger('dev'));
app.use(logger({stream: accessLog}));
app.use(partials());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/assets', express.static('public'));
app.use(multer({
        dest: './public/images',
        rename: function (fieldname, filename) {
                return filename;
        }
}));
app.use(cookieParser());
app.use(session({
        secret: settings.cookieSecret,
        key: settings.db,//cookie name
        cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
        store: new MongoStore({
                db: settings.db,
                host: settings.host,
                port: settings.port
        })
}));
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

routes(app);

// app.use(function (err, req, res, next) {
//         var meta = '[' + new Date() + '] ' + req.url + '\n';
//         errorLog.write(meta + err.stack + '\n');
//         next();
// });

app.use(bodyParser.urlencoded({extended: false}))
// parse application/json
app.use(bodyParser.json())
app.use(methodOverride());
app.use(function (err, req, res, next) {
        // 业务逻辑
        console.error(err.stack);
        next(err);
});

app.listen(app.get('port'), function () {
        console.log('Express server listening on port ' + app.get('port'));
});