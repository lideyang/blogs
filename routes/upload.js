/**
 * Created by lidy on 2016/9/18.
 */
var express = require('express');
var router = express.Router();
router.get('/controller', function (req, res, next) {
        if (req.query.action == 'config') {
                var config = {
                        /* 上传图片配置项 */
                        "imageActionName": "uploadimage", /* 执行上传图片的action名称 */
                        "imageFieldName": "upfile", /* 提交的图片表单名称 */
                        "imageMaxSize": 2048000, /* 上传大小限制，单位B */
                        "imageAllowFiles": [".png", ".jpg", ".jpeg", ".gif", ".bmp"], /* 上传图片格式显示 */
                        "imageCompressEnable": true, /* 是否压缩图片,默认是true */
                        "imageCompressBorder": 1600, /* 图片压缩最长边限制 */
                        "imageInsertAlign": "none", /* 插入的图片浮动方式 */
                        "imageUrlPrefix": "", /* 图片访问路径前缀 */
                        "imagePathFormat": "upload/image/{yyyy}{mm}{dd}/{time}{rand:6}", /* 上传保存路径,可以自定义保存路径和文件名格式 */
                }
                res.json(config);
        }

});
router.post('/controller', function (req, res, next) {
        if (req.query.action == 'uploadimage') {
                var fs = require('fs');
                var formidable = require("formidable");
                var form = new formidable.IncomingForm();
                form.uploadDir = "./public/upload/temp";//改变临时目录
                form.parse(req, function (error, fields, files) {
                        for (var key in files) {
                                var file = files[key];
                                var fName = (new Date()).getTime();
                                switch (file.type) {
                                        case "image/jpeg":
                                                fName = fName + ".jpg";
                                                break;
                                        case "image/png":
                                                fName = fName + ".png";
                                                break;
                                        default :
                                                fName = fName + ".png";
                                                break;
                                }
                                console.log(file.size);
                                var uploadDir = "./public/upload/" + fName;
                                fs.rename(file.path, uploadDir, function (err) {
                                        var result = new Object();
                                        if (err) {
                                                result = {
                                                        "state": "fail",
                                                        "message": "上传失败",
                                                        "data": ''
                                                };
                                        } else {
                                                result ={
                                                        "state": "SUCCESS",
                                                        "url": "/assets/upload/"+fName,
                                                        "title": fName,
                                                        "original": fName
                                                };
                                        }
                                        res.json(result);
                                });
                        }
                });
        }
});
module.exports = router;