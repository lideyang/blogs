var settings = require('../config/env'),
    Db = require('mongodb').Db,
    Connection = require('mongodb').Connection,
    Server = require('mongodb').Server;
module.exports = new Db(settings.mongo.options.db, new Server(settings.mongo.options.host, settings.mongo.options.port));