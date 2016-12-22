/**
 * Created by lidy on 2016/12/18.
 */
'use strict';

var path = require('path');
var _ = require('lodash');
var fs = require('fs');

var all = {
    env: process.env.NODE_ENV,
    root: path.normalize(__dirname + '/../../..'),
    port: process.env.PORT || 9001,
    //mongodb配置
    mongo: {
        options: {
            user: process.env.MONGO_USERNAME || '',
            pass: process.env.MONGO_PASSWORD || '',
            cookieSecret: 'myblog',
            db: 'blog',
            host: 'localhost',
            port: 27017
        }
    },
    //redis 配置
    redis: {
        host: process.env.REDIS_PORT_6379_TCP_ADDR || '127.0.0.1',
        port: process.env.REDIS_PORT_6379_TCP_PORT || 6379,
        password: process.env.REDIS_PASSWORD || ''
    },
    //是否初始化数据
    seedDB: false,
    session:{
        secrets: 'myblog',
    },
    //用户角色种类
    userRoles: ['user', 'admin'],
    //七牛配置
    qiniu:{
        app_key: process.env.QINIU_APP_KEY || '',
        app_secret: process.env.QINIU_APP_SECRET || '',
        domain: process.env.QINIU_APP_DOMAIN || '',          //七牛配置域名
        bucket: process.env.QINIU_APP_BUCKET || ''           //七牛空间名称
    },
    //默认首页图片.
    defaultIndexImage: 'images/index/default.jpg-600x1500q80',
    //第三方登录配置
    github:{
        clientID: process.env.GITHUB_CLIENT_ID || 'clientID',
        clientSecret: process.env.GITHUB_CLIENT_SECRET || 'clientSecret',
        callbackURL: process.env.GITHUB_CALLBACK_URL || '',
    },
    weibo:{
        clientID: process.env.WEIBO_CLIENT_ID || 'clientID',
        clientSecret: process.env.WEIBO_CLIENT_SECRET || 'clientSecret',
        callbackURL: process.env.WEIBO_CALLBACK_URL || '',
    },
    qq:{
        clientID: process.env.QQ_CLIENT_ID || 'clientID',
        clientSecret: process.env.QQ_CLIENT_SECRET || 'clientSecret',
        callbackURL: process.env.QQ_CALLBACK_URL || '',
    },
    apps:[
        {
            name:'',
            gitUrl:'',
            downloadUrl:{
                android:'',
                ios:''
            },
            qrcode:''
        },
        {
            name:'',
            gitUrl:'',
            downloadUrl:{
                android:'',
                ios:''
            },
            qrcode:''
        }
    ],
    snsLogins:[]
};

var config = _.merge(all,require('./' + process.env.NODE_ENV + '.js') || {});
module.exports = config;
