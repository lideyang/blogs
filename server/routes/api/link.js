/**
 * Created by Lidy on 2016/12/12.
 */
var express = require('express');
var router = express.Router();
//提交评论
router.get('/linkList', function (req, res, next) {
    return  res.json({
        success: true,
        data:[
            {
                url:'http://www.qdfuns.com/',
                name:'前端网'
            },
            {
                url:'http://www.jianshu.com/',
                name:'简书'
            }
        ]
    });
});
module.exports = router;