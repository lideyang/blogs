/**
 * Created by Lidy on 2016/12/13.
 */
var express = require('express'),
    crypto = require('crypto'),
    Post = require('../../models/post.js'),
    User = require('../../models/user.js');
var router = express.Router();
//注册帐号
router.post('/register', function (req, res, next) {
    var name = req.body.name,
        password = req.body.password,
        rePwd = req.body['rePwd'];
    //检验用户两次输入的密码是否一致
    if (rePwd != password) {
        return res.json({
            success: false,
            msg: '两次输入的密码不一致!'
        });
    }
    //生成密码的 md5 值
    var md5 = crypto.createHash('md5'),
        password = md5.update(req.body.password).digest('hex');
    var newUser = new User({
        name: req.body.name,
        password: password,
        email: req.body.email
    });
    //检查用户名是否已经存在
    User.get(newUser.name, function (err, user) {
        if (user) {
            return res.json({
                success: false,
                msg: '用户已存在!'
            });
        }
        //如果不存在则新增用户
        newUser.save(function (err, user) {
            if (err) {
                return res.json({
                    success: false,
                    msg: '注册失败，请稍后再试'
                });//注册失败提示
            }
            req.session.user = user;//用户信息存入 session
            return res.json({//成功！返回文章页
                success: true,
                msg: '/login'
            });
        });
    });
});
//登录
router.post('/login', function (req, res) {
    //生成密码的 md5 值
    var md5 = crypto.createHash('md5'),
        password = md5.update(req.body.password).digest('hex');
    //检查用户是否存在
    User.get(req.body.name, function (err, user) {
        //检查密码是否一致
        if (!user || user.password != password) {
            return res.json({//密码错误
                success: false,
                msg: '用户名或密码错误'
            });
        }
        //用户名密码都匹配后，将用户信息存入 session
        req.session.user = user;
        res.json({//成功！返回文章页
            success: true,
            msg: '/'//登陆成功后跳转到主页
        });
    });
});
module.exports = router;