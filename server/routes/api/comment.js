/**
 * Created by Lidy on 2016/12/12.
 */
var express = require('express'),
    Post = require('../../models/post.js'),
    Comment = require('../../models/comment.js');
var router = express.Router();
//提交评论
router.post('/add', function (req, res, next) {
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
            return res.json({success: false, msg: '保存失败'});
        }
        return res.json({
            success: true,
            data: {
                time: time
            }
        });
    });
});
module.exports = router;