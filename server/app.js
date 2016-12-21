'use strict';

// 设置默认环境变量
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var express = require('express');
var config = require('./config/env');
var path = require('path');
var fs = require('fs');
var errorHandler = require('errorhandler');

var app = express();

require('./config/express')(app);
require('./routes')(app);

if ('development' === config.env) {
    app.use(errorHandler());
}else{
    app.use(function (err, req, res, next) {
        console.error(err.stack);
        return res.status(500).send();
    });
}
app.use(function (err, req, res, next) {
    // 业务逻辑
    console.error(err.stack);
    next(err);
});
// Start server
app.listen(config.port, function () {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

exports = module.exports = app;