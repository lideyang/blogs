/**
 * Created by lidy on 2016/12/19.
 */
import React from 'react';
import ReactDOM from 'react-dom/server';
import ArticleDetailComponent from '../js/pages/articleDetail';
import ArticleAddComponent from '../js/pages/articleAdd';
import ArticleEditComponent from '../js/pages/articleEdit';
import Action from '../api';

export function ArticleDetail(req, res) {
    if (!req.params.id) {
        return res.render('articleDetail', {
            react: '系统维护中。。。',
            initialState: [],
            title: 'lidy的个人主页-文章详情',
        })
    }

    Action.ArticleDetail({
        params: {
            id: req.params.id
        }
    }).then(
        response => {
            try {
                var props = {
                    articleDetail: response.data
                }
                const html = ReactDOM.renderToString(React.createElement(ArticleDetailComponent, props));
                return res.render('articleDetail', {
                    react: html,
                    initialState: props,
                    title: 'lidy的个人主页-文章详情',
                })
            } catch (e) {
                console.log(e);
            }
        }
    );
}

export function ArticleAdd(req, res) {
    const html = ReactDOM.renderToString(React.createElement(ArticleAddComponent));
    return res.render('articleAdd', {
        react: html,
        initialState: [],
        title: 'lidy的个人主页-发表文章',
    })
}

export function ArticleEdit(req, res) {
    if (!req.params.id) {
        return res.render('articleEdit', {
            react: '系统维护中。。。',
            initialState: [],
            title: 'lidy的个人主页-编辑文章',
        })
    }
    Action.ArticleEdit('get', {
        params: {
            id: req.params.id
        }
    }).then(
        response => {
            try {
                var props = {
                    data: response.data
                };
                const html = ReactDOM.renderToString(React.createElement(ArticleEditComponent, props));
                return res.render('articleEdit', {
                    react: html,
                    initialState: props,
                    title: 'lidy的个人主页-编辑文章',
                })
            } catch (e) {
                console.log(e);
            }
        }
    );
}