/**
 * Created by Lidy on 2016/12/12.
 */
var express = require('express'),
    Post = require('../../models/post.js');
var router = express.Router();
//提交评论
router.get('/', function (req, res, next) {
    console.log(req.query.keyword);
    var keyword = req.query.keyword;
    var page = req.query.p ? parseInt(req.query.p) : 1;
    Post.search(keyword, page, function (err, posts) {
        if (err) {
            res.json({
                success: false,
                data: '查询失败'
            });
        }
        return res.json({
            success: true,
            data: posts
        });
    });
});
module.exports = router;