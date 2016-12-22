'use strict';

var express = require('express');
var compression = require('compression');
var bodyParser = require('body-parser');
var cors = require('cors');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var path = require('path');
//var passport = require('passport');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var config = require('./env');

module.exports = function(app) {
    //app.enable('trust proxy');
    var options = {
        origin: true,
        credentials: true
    };
    app.use(cors(options)); //跨域
    app.use(compression()); //gzip
    app.use(bodyParser.urlencoded({ extended: false })); //form多级参数
    app.use(bodyParser.json()); //解析json
    app.use(bodyParser());
    app.use(methodOverride()); //REST风格
    app.use(function (err, req, res, next) {
        // 业务逻辑
        console.error(err.stack);
        next(err);
    });
    app.use(cookieParser());
    app.use(session({
        secret: config.session.secrets,
        resave: true,
        saveUninitialized: false,
        store: new RedisStore({
            host:config.redis.host,
            port:config.redis.port,
            pass:config.redis.password || ''
        })
    }));
    //app.use(passport.initialize()); //登录auto
};
