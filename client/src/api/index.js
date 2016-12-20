/**
 * Created by lidy on 2016/12/18.
 */
import {ArticleResource, CommentResource, AccountResource} from './resources'

export default {
    ArticleList: function (data) {
        return ArticleResource('get', 'list', data);
    },
    ArticleDetail: function (data) {
        return ArticleResource('get', 'detail', data);
    },
    CommentAdd: function (data) {
        return CommentResource('post', 'add', data);
    },
    AccountRegister: function (data) {
        return AccountResource('post', 'register', data);
    },
    AccountLogin: function (data) {
        return AccountResource('post', 'login', data);
    }
}