/**
 * Created by lidy on 2016/9/22.
 */
var express = require('express'),
    Post = require('../../models/post.js'),
    User = require('../../models/user.js');
var router = express.Router();
//获取文章列表
router.get('/list', function (req, res, next) {
    console.log('list');
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
router.get('/getArticleInfo', function (req, res, next) {
    Post.getOne(req.query.id, function (err, posts) {
        if (err) {
            return res.json({
                success: false,
                msg: '查询失败'
            });
        }
        return res.json(posts);
    });
});
//获取一个用户文章列表
router.get('/getUserArticleList', function (req, res, next) {
    var page = req.query.p ? parseInt(req.query.p) : 1;
    //检查用户是否存在
    User.get(req.query.name, function (err, user) {
        if (err) {
            return res.json({
                success: false,
                msg: '查询失败'
            });
        }
        if (!user) {
            return res.json({
                success: false,
                msg: '用户不存在!'
            });
        }
        //查询并返回该用户第 page 页的 10 篇文章
        Post.getTen(user.name, page, function (err, posts, total) {
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
});
//获取查询分类列表
router.get('/getSortArticleList', function (req, res, next) {
    var page = req.query.p ? parseInt(req.query.p) : 1;
    //检查用户是否存在
    //var sort = req.query.sort === 'all' ? '' : req.query.sort;
    Post.getSort(req.query.sort, page, function (err, posts, total) {
        if (err) {
            return res.json({
                success: false,
                msg: '查询失败'
            });
        }
        if (!posts) {
            return res.json({
                success: false,
                msg: '分类不存在!'
            });
        }
        return res.json(posts);
    });
});
//编辑获取文章内容
router.get('/getArchiveContent', function (req, res, next) {
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
            return res.json({
                success: false,
                msg: '更新文章失败'
            });
        }
        var url = encodeURI('/u/' + req.query.id);
        res.json({//成功！返回文章页
            success: true,
            msg: url
        });
    });
});
//新增文章
router.post('/addArchive', function (req, res, next) {
    var currentUser = req.session.user;
    var posts = {
        name: currentUser.name,
        head: currentUser.head,
        title: req.body.title,
        tags: req.body.tags,
        post: req.body.post,
        sort: req.body.sort,
        description: req.body.description
    }
    Post.save(posts, function (err, doc) {
        if (err) {
            return res.json({//出错提示
                success: false,
                msg: '保存失败，请联系管理员'
            });
        }
        var url = '/u/' + doc.insertedIds;
        res.json({//成功！返回文章页
            success: true,
            msg: url
        });
    });
});
module.exports = router;