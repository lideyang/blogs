/**
 * Created by Lidy on 2016/12/12.
 */
var express = require('express'),
    Post = require('../../models/post.js');
var router = express.Router();
//获取所有存档
router.get('/getArchiveList', function (req, res, next) {
    Post.getArchive(function (err, posts) {
        if (err) {
            return res.json({//出错提示
                success: false,
                msg: '查询失败'
            });
        }
        return res.json(posts);
    });
});
module.exports = router;