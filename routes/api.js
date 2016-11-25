/**
 * Created by lidy on 2016/9/22.
 */
var express = require('express'),
        Post = require('../models/post.js'),
        crypto = require('crypto'),
        Comment = require('../models/comment.js');
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
router.post('/postArticleComment', function (req, res, next) {
    var date = new Date(),
        time = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +
            date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
    var comment = {
        name: req.body.name||'游客',
        head: '',
        email: req.body.email||'',
        website: req.body.website||'',
        time: time,
        content: req.body.content
    };
    var newComment = new Comment(req.params.name, req.params.day, req.params.title, comment);
    newComment.save(function (err) {
        if (err) {
            req.flash('error', err);
            return res.redirect('back');
        }
        req.flash('success', '留言成功!');
        res.redirect('back');
    });
});
module.exports = router;