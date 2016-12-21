'use strict';

module.exports = function(app) {
    app.use('/api/account',require('./api/account')); //账号相关
    app.use('/api/archive',require('./api/archive')); //文章存档
    app.use('/api/article',require('./api/article')); //文章增删改查
    app.use('/api/comment',require('./api/comment')); //评论
    app.use('/api/search',require('./api/search')); //搜索文章
    app.use('/api/sort',require('./api/sort')); //按分类文章查询
    app.use('/api/tag',require('./api/tag')); //按标签文章查询
    app.use('/api/user',require('./api/user'));//按用户文章查询
    app.use('/api/link',require('./api/link'));//友情链接
};