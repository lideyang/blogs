/**
 * Created by lidy on 2016/9/22.
 */
var express = require('express'),
    Post = require('../../models/post.js'),
    ObjectID = require('mongodb').ObjectID;
var router = express.Router();
//获取文章列表
router.get('/list', function (req, res, next) {
    console.log(req.query.p);
    //判断是否是第一页，并把请求的页数转换成 number 类型
    var page = req.query.p ? parseInt(req.query.p) : 1;
    //查询并返回第 page 页的 10 篇文章
    Post.getTen(null, page, function (err, posts, total) {
        if (err) {
            return res.json({
                success: false,
                msg: '查询失败'
            });
        }
        return res.json({
            success: true,
            data: posts,
            total: Math.ceil(total / 10)
        });
    });
});
//获取一篇文章信息及评论
router.get('/detail', function (req, res, next) {
    console.log(req.query.id);
    if (!req.query.id) {
        return res.json({
            success: false,
            data: '查询失败'
        });
    }
    Post.getOne(req.query.id, function (err, posts) {
        if (err || !posts) {
            return res.json({
                success: false,
                data: '查询失败'
            });
        } else {
            return res.json({
                success: true,
                data: posts
            });
        }
    });
});
//新增文章
router.post('/add', function (req, res, next) {
    var currentUser = req.session.user;
    console.log(req.session);
    var posts = {
        name: currentUser.name,
        head: currentUser.head,
        title: req.body.title,
        tags: req.body.tags,
        post: req.body.post,
        sort: req.body.sort,
        description: req.body.description,
        minute: req.body.minute
    }
    Post.save(posts, function (err, doc) {
        if (err) {
            return res.json({//出错提示
                success: false,
                msg: '保存失败，请联系管理员'
            });
        }
        var url = '/u/' + doc.insertedIds;
        return res.json({//成功！返回文章页
            success: true,
            msg: url
        });
    });
});
//编辑文章获取
router.get('/edit', function (req, res, next) {
    Post.edit(req.query.id, function (err, post) {
        if (err) {
            return res.json({
                success: false,
                msg: '查询失败'
            });
        }
        return res.json(post);
    });
});
//编辑保存文章
router.post('/edit', function (req, res, next) {
    var posts = {
        id: req.body.id,
        title: req.body.title,
        tags: [req.body.tag1, req.body.tag2, req.body.tag3],
        post: req.body.post,
        sort: req.body.sort,
        description: req.body.description,
        minute: req.body.minute
    }
    Post.update(posts, function (err) {
        if (err) {
            return res.json({
                success: false,
                msg: '更新文章失败'
            });
        }
        var url = encodeURI('/u/' + req.body.id);
        return res.json({//成功！返回文章页
            success: true,
            msg: url
        });
    });
});
//删除文章
router.get('/del', function (req, res, next) {
    Post.del(req.query.id, function (err, post) {
        if (err) {
            return res.json({
                success: false,
                msg: '删除失败'
            });
        }
        return res.json({success: true});
    });
});

module.exports = router;