/**
 * Created by lidy on 2016/12/19.
 */
import ArticleDetailComponent from '../js/pages/articleDetail'
import ArticleAddComponent from '../js/pages/articleAdd'
import ArticleEditComponent from '../js/pages/articleEdit'
import View from './view'
import Action from '../api'

export function ArticleDetail(req, res) {
    if (!req.params.id) {
        return res.redirect('/');
    }

    Action.ArticleDetail({
        params: {
            id: req.params.id
        }
    }).then(
        response => {
            let data = response.data;
            if (data.success) {
                View(req, res, 'articleDetail', '文章详情', {
                    Component: ArticleDetailComponent,
                    props: {
                        articleDetail: data.data
                    }
                })
            } else {
                return res.redirect('/404');
            }
        }
    );
}

export function ArticleAdd(req, res) {
    View(req, res, 'articleAdd', '发表文章', {
        Component: ArticleAddComponent
    })
}

export function ArticleEdit(req, res) {
    if (!req.params.id) {
        return res.redirect('/');
    }
    Action.ArticleEdit('get', {
        params: {
            id: req.params.id
        }
    }).then(
        response => {
            View(req, res, 'articleEdit', '编辑文章', {
                Component: ArticleEditComponent,
                props: {
                    data: response.data
                }
            })
        }
    );
}

export function ArticleDel(req, res) {
    if (!req.params.id) {
        return res.redirect('/');
    }
    Action.ArticleDel('get', {
        params: {
            id: req.params.id
        }
    }).then(
        response => {
            return res.redirect('/');
        }
    );
}