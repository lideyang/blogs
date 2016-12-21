/**
 * Created by Lidy on 2016/12/13.
 */
var express = require('express'),
    Post = require('../../models/post.js'),
    User = require('../../models/user.js');
var router = express.Router();
//获取一个用户文章列表
router.get('/articleList', function (req, res, next) {
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
                userName: user.name,
                total: Math.ceil(total / 10)
            });
        });
    });
});

module.exports = router;