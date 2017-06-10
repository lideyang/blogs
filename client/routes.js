/**
 * Created by lidy on 2016/12/18.
 */
'use strict';
import * as authService from './src/js/utils/authService'
import * as Controller from './src/controller';


module.exports = function (app) {
    app.get('/', function (req, res) {
        Controller.Home(req, res);
    });

    app.get('/reg', checkNotLogin);
    app.get('/reg', function (req, res) {
        Controller.Register(req, res);
    });

    app.get('/login', checkNotLogin);
    app.get('/login', function (req, res) {
        Controller.Login(req, res);
    });

    app.get('/post', checkLogin);
    app.get('/post', function (req, res) {
        Controller.ArticleAdd(req, res);
    });

    app.use('/upload', require('./src/controller/uploadController'));

    app.get('/logout', checkLogin);
    app.get('/logout', function (req, res) {
        Controller.Logout(req, res);
    });

    app.get('/archive', function (req, res) {
        Controller.Archive(req, res);
    });

    app.get('/tags', function (req, res) {
        Controller.Tags(req, res);
    });

    app.get('/tag/:tag', function (req, res) {
        Controller.Tag(req, res);
    });

    app.get('/links', function (req, res) {
        res.render('links', {
            title: 'lidy的个人主页-友情链接',
            user: req.session.user
        });
    });

    app.get('/search/:keyword', function (req, res) {
        Controller.Search(req, res);
    });

    app.get('/u/:id', function (req, res) {
        Controller.ArticleDetail(req, res);
    });

    app.get('/u/name/:name', function (req, res) {
        Controller.UserArchive(req,res);
    });
    app.get('/u/sort/:sort', function (req, res) {
        Controller.SortList(req, res)
    });


    app.get('/u/edit/:id', checkLogin);
    app.get('/u/edit/:id', function (req, res) {
        Controller.ArticleEdit(req, res);
    });

    app.get('/u/remove/:id', checkLogin);
    app.get('/u/remove/:id', function (req, res) {
        Controller.ArticleDel(req, res);
    });
    app.get('/404', function (req, res) {
        Controller.Page404(req,res);
    });
    app.use(function (req, res) {
        return res.redirect('/404');
    });

    function checkLogin(req, res, next) {
        if (!authService.isLogin(req)) {
            return res.redirect('/login');
        } else {
            next();
        }

    }

    function checkNotLogin(req, res, next) {
        console.log('login');
        console.log(authService.isLogin(req));
        if (authService.isLogin(req)) {
            return res.redirect('/');//返回之前的页面
        }
        next();
    }
};