'use strict';

module.exports = function(app) {
    app.use('/api/account',require('./api/account'));
    app.use('/api/archive',require('./api/archive'));
    app.use('/api/article',require('./api/article'));
    app.use('/api/comment',require('./api/comment'));
    app.use('/api/search',require('./api/search'));
};