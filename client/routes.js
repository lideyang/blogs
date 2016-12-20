/**
 * Created by lidy on 2016/12/18.
 */
'use strict';

import path from 'path';
import * as Controller from './src/controller';


module.exports = function (app) {
    app.get('/', function (req, res) {
        Controller.HomeController(req, res);
    });

    app.get('/reg', checkNotLogin);
    app.get('/reg', function (req, res) {
        Controller.RegisterController(req, res);
    });

    app.get('/login', checkNotLogin);
    app.get('/login', function (req, res) {
        Controller.LoginController(req, res);
    });

    app.get('/post', checkLogin);
    app.get('/post', function (req, res) {
        res.render('post', {
            title: 'lidy的个人主页-发表文章',
            user: req.session.user
        });
    });

    // app.get('/logout', checkLogin);
    app.get('/logout', function (req, res) {
        if (req.session && req.session.user) {
            req.session.user = null;
        }
        res.redirect('/login');//登出成功后跳转到登录页
    });

    app.get('/upload', checkLogin);
    app.get('/upload', function (req, res) {
        res.render('upload', {
            title: '文件上传',
            user: req.session.user
        });
    });

    app.post('/upload', checkLogin);
    app.post('/upload', function (req, res) {
        res.redirect('/upload');
    });

    app.get('/archive', function (req, res) {
        Post.getArchive(function (err, posts) {
            if (err) {
                return res.redirect('/');
            }
            res.render('archive', {
                title: 'lidy的个人主页-存档',
                posts: posts,
                user: req.session.user
            });
        });
    });

    app.get('/tags', function (req, res) {
        res.render('tags', {
            title: 'lidy的个人主页-标签',
            user: req.session.user
        });
    });

    app.get('/tag/:tag', function (req, res) {
        res.render('tag', {
            title: 'lidy的个人主页-标签:' + req.params.tag,
            user: req.session.user
        });
    });

    app.get('/links', function (req, res) {
        res.render('links', {
            title: 'lidy的个人主页-友情链接',
            user: req.session.user
        });
    });

    app.get('/search/:keyword', function (req, res) {
        res.render('search', {
            title: "lidy的个人主页-搜索结果:" + req.params.keyword,
            user: req.session.user
        });
    });

    app.get('/u/:id', function (req, res) {
        Controller.ArticleController(req, res);
    });

    app.get('/u/name/:name', function (req, res) {
        var page = req.query.p ? parseInt(req.query.p) : 1;
        //检查用户是否存在
        res.render('user', {
            title: 'lidy的个人主页-' + req.params.name + '的文章',
            page: page,
            user: req.session.user
        });
    });
    app.get('/u/sort/:sort', function (req, res) {
        var page = req.query.p ? parseInt(req.query.p) : 1;
        res.render('sort', {
            title: 'lidy的个人主页-分类查询-' + req.params.sort,
            page: page,
            user: req.session.user
        });
    });


    app.get('/edit/:id', checkLogin);
    app.get('/edit/:id', function (req, res) {
        var id = req.params.id;
        if (!id) {
            return res.redirect('/');
        }
        res.render('edit', {
            title: 'lidy的个人主页-文章编辑'
        });
    });

    app.get('/remove/:name/:day/:title', checkLogin);
    app.get('/remove/:name/:day/:title', function (req, res) {
        var currentUser = req.session.user;
        Post.remove(currentUser.name, req.params.day, req.params.title, function (err) {
            if (err) {
                return res.redirect('back');
            }
            res.redirect('/');
        });
    });

    app.get('/reprint/:name/:day/:title', checkLogin);
    app.get('/reprint/:name/:day/:title', function (req, res) {
        Post.edit(req.params.name, req.params.day, req.params.title, function (err, post) {
            if (err) {
                return res.redirect('back');
            }
            var currentUser = req.session.user,
                reprint_from = {name: post.name, day: post.time.day, title: post.title},
                reprint_to = {name: currentUser.name, head: currentUser.head};
            Post.reprint(reprint_from, reprint_to, function (err, post) {
                if (err) {
                    return res.redirect('back');
                }
                var url = encodeURI('/u/' + post.name + '/' + post.time.day + '/' + post.title);
                res.redirect(url);
            });
        });
    });

    app.use(function (req, res) {
        res.render("404", {title: '404'});
    });

    function checkLogin(req, res, next) {
        console.log(req.session);
        if (!req.session.user) {
            return res.redirect('/login');
        } else {
            next();
        }

    }

    function checkNotLogin(req, res, next) {
        if (req.session.user) {
            return res.redirect('/');//返回之前的页面
        }
        next();
    }
};