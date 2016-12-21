/**
 * Created by lidy on 2016/12/18.
 */
import {AccountResource, ArchiveResource, ArticleResource, CommentResource, SearchResource} from './resources'

export default {
    AccountRegister: function (data) {
        return AccountResource('post', 'register', data);
    },
    AccountLogin: function (data) {
        return AccountResource('post', 'login', data);
    },
    ArchiveList: function (data) {
        return ArchiveResource('get', 'list', data);
    },
    ArticleList: function (data) {
        return ArticleResource('get', 'list', data);
    },
    ArticleDetail: function (data) {
        return ArticleResource('get', 'detail', data);
    },
    ArticleAdd: function (data) {
        return ArticleResource('post', 'add', data);
    },
    ArticleEdit: function (method, data) {
        return ArticleResource(method, 'edit', data);
    },
    CommentAdd: function (data) {
        return CommentResource('post', 'add', data);
    },
    Search: function (data) {
        return SearchResource('post', null, data);
    }
}