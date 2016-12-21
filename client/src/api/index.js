/**
 * Created by lidy on 2016/12/18.
 */
import {
    AccountResource,
    ArchiveResource,
    ArticleResource,
    CommentResource,
    SearchResource,
    SortResource,
    TagResource,
    UserResource
} from './resources'

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
    ArticleDel: function (method, data) {
        return ArticleResource(method, 'del', data);
    },
    CommentAdd: function (data) {
        return CommentResource('post', 'add', data);
    },
    Search: function (data) {
        return SearchResource('get', null, data);
    },
    SortList: function (data) {
        return SortResource('get', 'list', data);
    },
    TagList: function (data) {
        return TagResource('get', 'list', data);
    },
    TagAll: function (data) {
        return TagResource('get', 'all', null);
    },
    UserArticleList: function (data) {
        return UserResource('get', 'articleList', data);
    }
}