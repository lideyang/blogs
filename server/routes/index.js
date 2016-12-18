'use strict';

module.exports = function(app) {

    app.use('/api/article',require('./api/article'));

};