var mongodb = require('./db'),
    ObjectID = require('mongodb').ObjectID;

function Comment(id, comment) {
    this.id = id;
    this.comment = comment;
}
//存储一条留言信息
Comment.prototype.save = function (callback) {
    var date = new Date();
    var id = this.id,
        comment = this.comment,
        lastTime = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +
            date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
    //打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        //读取 posts 集合
        db.collection('posts', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            //通过用户名、时间及标题查找文档，并把一条留言对象添加到该文档的 comments 数组里
            collection.update({
                _id: ObjectID(id)
            }, {
                $set: {
                    'lastTime': lastTime
                },
                $push: {"comments": comment}
            }, function (err) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                callback(null);
            });
        });
    });
};
module.exports = Comment;