/**
 * Created by lidy on 2016/9/22.
 */
var express = require('express'),
        Post = require('../models/post.js');
var router = express.Router();
//获取文章列表
router.get('/getNavInfo', function (req, res, next) {
        Post.getTopArticle(10, 'time', function (err, posts) {
                if (err) {
                        req.flash('error', err);
                        return res.redirect('/');
                }
                res.json(posts);
        });
});
//获取一篇文章信息
router.get('/getArticleInfo', function (req, res, next) {
    Post.getOne(req.query.id,function (err, posts) {
        if (err) {
            req.flash('error', err);
            return res.redirect('/');
        }
        res.json(posts);
    });
});
module.exports = router;