var crypto = require('crypto'),
    fs = require('fs'),
    User = require('../models/user.js'),
    Post = require('../models/post.js'),
    Comment = require('../models/comment.js');

module.exports = function (app) {
    app.get('/', function (req, res) {
        //判断是否是第一页，并把请求的页数转换成 number 类型
        var page = req.query.p ? parseInt(req.query.p) : 1;
        //查询并返回第 page 页的 10 篇文章
        Post.getTen(null, page, function (err, posts, total) {
            if (err) {
                posts = [];
            }
            //console.log(posts[posts.length-1].post);
            res.render('index', {
                title: 'lidy的个人主页',
                posts: posts,
                page: page,
                host: req.rawHeaders[1],
                isFirstPage: (page - 1) == 0,
                isLastPage: ((page - 1) * 10 + posts.length) == total,
                user: req.session.user,
                success: req.flash('success').toString(),
                error: req.flash('error').toString()
            });
        });
    });

    app.get('/reg', checkNotLogin);
    app.get('/reg', function (req, res) {
        res.render('reg', {
            title: 'lidy的个人主页-注册',
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        });
    });

    app.get('/login', checkNotLogin);
    app.get('/login', function (req, res) {
        res.render('login', {
            title: 'lidy的个人主页-登录',
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        });
    });

    app.get('/post', checkLogin);
    app.get('/post', function (req, res) {
        res.render('post', {
            title: 'lidy的个人主页-发表文章',
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        });
    });
    // app.get('/logout', checkLogin);
    app.get('/logout', function (req, res) {
        if (req.session && req.session.user) {
            req.session.user = null;
        }
        req.flash('success', '登出成功!');
        res.redirect('/login');//登出成功后跳转到登录页
    });

    app.get('/upload', checkLogin);
    app.get('/upload', function (req, res) {
        res.render('upload', {
            title: '文件上传',
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        });
    });

    app.post('/upload', checkLogin);
    app.post('/upload', function (req, res) {
        req.flash('success', '文件上传成功!');
        res.redirect('/upload');
    });

    app.get('/archive', function (req, res) {
        Post.getArchive(function (err, posts) {
            if (err) {
                req.flash('error', err);
                return res.redirect('/');
            }
            res.render('archive', {
                title: 'lidy的个人主页-存档',
                posts: posts,
                user: req.session.user,
                success: req.flash('success').toString(),
                error: req.flash('error').toString()
            });
        });
    });

    app.get('/tags', function (req, res) {
        res.render('tags', {
            title: 'lidy的个人主页-标签',
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        });
    });

    app.get('/tag/:tag', function (req, res) {
        res.render('tag', {
            title: 'lidy的个人主页-标签:' + req.params.tag,
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        });
    });

    app.get('/links', function (req, res) {
        res.render('links', {
            title: 'lidy的个人主页-友情链接',
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        });
    });

    app.get('/search/:keyword', function (req, res) {
        res.render('search', {
            title: "lidy的个人主页-搜索结果:" + req.params.keyword,
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        });
    });

    app.get('/u/:id', function (req, res) {
        Post.getOne(req.params.id, function (err, post) {
            if (err) {
                req.flash('error', err);
                return res.redirect('/');
            }
            res.render('article', {
                title: 'lidy的个人主页-文章详情',
                post: post,
                host: req.rawHeaders[1],
                user: req.session.user,
                success: req.flash('success').toString(),
                error: req.flash('error').toString()
            });
        });
    });

    app.get('/u/name/:name', function (req, res) {
        var page = req.query.p ? parseInt(req.query.p) : 1;
        //检查用户是否存在
        res.render('user', {
            title: 'lidy的个人主页-' + req.params.name + '的文章',
            page: page,
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        });
    });
    app.get('/u/sort/:sort', function (req, res) {
        var page = req.query.p ? parseInt(req.query.p) : 1;
        res.render('sort', {
            title: 'lidy的个人主页-分类查询-' + req.params.sort,
            page: page,
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        });
    });


    app.get('/edit/:id', checkLogin);
    app.get('/edit/:id', function (req, res) {
        var id = req.params.id;
        if (!id) {
            req.flash('error', err);
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
                req.flash('error', err);
                return res.redirect('back');
            }
            req.flash('success', '删除成功!');
            res.redirect('/');
        });
    });

    app.get('/reprint/:name/:day/:title', checkLogin);
    app.get('/reprint/:name/:day/:title', function (req, res) {
        Post.edit(req.params.name, req.params.day, req.params.title, function (err, post) {
            if (err) {
                req.flash('error', err);
                return res.redirect('back');
            }
            var currentUser = req.session.user,
                reprint_from = {name: post.name, day: post.time.day, title: post.title},
                reprint_to = {name: currentUser.name, head: currentUser.head};
            Post.reprint(reprint_from, reprint_to, function (err, post) {
                if (err) {
                    req.flash('error', err);
                    return res.redirect('back');
                }
                req.flash('success', '转载成功!');
                var url = encodeURI('/u/' + post.name + '/' + post.time.day + '/' + post.title);
                res.redirect(url);
            });
        });
    });

    app.use(function (req, res) {
        res.render("404", {title: '404'});
    });

    function checkLogin(req, res, next) {
        if (!req.session.user) {
            req.flash('error', '未登录!');
            return res.redirect('/login');
        } else {
//                         console.log(req.params.name + ':' + req.session.user.name);
//                         if (req.params.name && req.params.name == req.session.user.name) {
//                              next();
//                         } else {
//                                 req.flash('error', '未登录!');
//                                 return res.redirect('/login');
//                         }
            next();
        }

    }

    function checkNotLogin(req, res, next) {
        if (req.session.user) {
            req.flash('error', '已登录!');
            return res.redirect('/');//返回之前的页面
        }
        next();
    }
};
