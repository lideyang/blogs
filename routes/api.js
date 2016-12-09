/**
 * Created by lidy on 2016/9/22.
 */
var express = require('express'),
    Post = require('../models/post.js'),
    crypto = require('crypto'),
    Comment = require('../models/comment.js'),
    User = require('../models/user.js');
var router = express.Router();
//获取文章列表
router.get('/getNavInfo', function (req, res, next) {
    Post.getTopArticle(10, 'time', function (err, posts) {
        if (err) {
            req.flash('error', err);
            return res.redirect('/');
        }
        return res.json(posts);
    });
});
//获取一篇文章信息及评论
router.get('/getArticleInfo', function (req, res, next) {
    Post.getOne(req.query.id, function (err, posts) {
        if (err) {
            req.flash('error', err);
            return res.redirect('/');
        }
        return res.json(posts);
    });
});
//提交评论
router.post('/postArticleComment', function (req, res, next) {
    if (!req.body.id) {
        return res.json({success: false});
    }
    var date = new Date(),
        time = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +
            date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
    var comment = {
        name: req.body.name || '游客',
        head: '',
        email: req.body.email || '',
        website: req.body.website || '',
        time: time,
        content: req.body.content
    };
    var newComment = new Comment(req.body.id, comment);
    newComment.save(function (err) {
        if (err) {
            return res.json({success: false, msg: err});
        }
        return res.json({success: true});
    });
});
//获取一个用户文章列表
router.get('/getUserArticleList', function (req, res, next) {
    var page = req.query.p ? parseInt(req.query.p) : 1;
    //检查用户是否存在
    User.get(req.query.name, function (err, user) {
        if (err) {
            req.flash('error', err);
            return res.redirect('/');
        }
        if (!user) {
            req.flash('error', '用户不存在!');
            return res.redirect('/');
        }
        //查询并返回该用户第 page 页的 10 篇文章
        Post.getTen(user.name, page, function (err, posts, total) {
            if (err) {
                req.flash('error', err);
                return res.redirect('/');
            }
            return res.json(posts);
        });
    });
});
//获取查询分类列表
router.get('/getSortArticleList', function (req, res, next) {
    var page = req.query.p ? parseInt(req.query.p) : 1;
    //检查用户是否存在
    Post.getSort(req.query.sort, page, function (err, posts, total) {
        if (err) {
            req.flash('error', err);
            return res.redirect('/');
        }
        if (!posts) {
            req.flash('error', '分类不存在!');
            return res.redirect('/');
        }
        return res.json(posts);
    });
});
//获取所有存档
router.get('/getArchiveList', function (req, res, next) {
    Post.getArchive(function (err, posts) {
        if (err) {
            req.flash('error', err);
            return res.redirect('/');
        }
        return res.json(posts);
    });
});
//编辑获取文章内容
router.get('/getArchiveContent', function (req, res, next) {
    Post.edit(req.query.id, function (err, post) {
        if (err) {
            req.flash('error', err);
            return res.redirect('/');
        }
        return res.json(post);
    });
});
//编辑保存文章内容
router.post('/setArchiveContent', function (req, res, next) {
    var posts = {
        id: req.query.id,
        title: req.body.title,
        tags: [req.body.tag1, req.body.tag2, req.body.tag3],
        post: req.body.post,
        sort: req.body.sort,
        description: req.body.description
    }
    Post.update(posts, function (err) {
        if (err) {
            req.flash('error', err);
            return res.redirect(url);//出错！返回文章页
        }
        var url = encodeURI('/u/' + req.query.id);
        res.json({//成功！返回文章页
            success: true,
            msg: url
        });
    });
});
module.exports = router;