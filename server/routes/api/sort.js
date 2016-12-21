/**
 * Created by lidy on 2016/12/21.
 */
var express = require('express'),
    Post = require('../../models/post.js');
var router = express.Router();
//查询分类列表
router.get('/list', function (req, res, next) {
    var page = req.query.p ? parseInt(req.query.p) : 1;
    //var sort = req.query.sort === 'all' ? '' : req.query.sort;
    Post.getSort(req.query.sort, page, function (err, posts, total) {
        if (err) {
            return res.json({
                success: false,
                data: '查询失败'
            });
        }
        if (!posts) {
            return res.json({
                success: false,
                data: '分类不存在!'
            });
        }
        return res.json({
            success: true,
            data: posts
        });
    });
});
module.exports = router;