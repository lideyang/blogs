/**
 * Created by Lidy on 2016/12/13.
 */
var express = require('express'),
    Post = require('../../models/post.js');
var router = express.Router();
//获取指定标签文章
router.get('/tag', function (req, res, next) {
    var tag = req.query.tag;
    var page = req.query.p ? parseInt(req.query.p) : 1;
    Post.getTag(tag, page, function (err, posts) {
        if (err) {
            return res.json({
                success: false,
                msg: '查询失败'
            });
        }
        return res.json({
            success: true,
            data: posts
        });
    });
});
//获取所有标签
router.get('/tags', function (req, res, next) {
    Post.getTags(function (err, posts) {
        if (err) {
            return res.json({
                success: false,
                msg: '查询失败'
            });
        }
        return res.json({
            success: true,
            data: posts
        });
    });
});
module.exports = router;