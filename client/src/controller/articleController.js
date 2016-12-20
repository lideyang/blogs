/**
 * Created by lidy on 2016/12/19.
 */
import React from 'react';
import ReactDOM from 'react-dom/server';
import Article from '../js/pages/article';
import Action from '../api';
export function get_article(req, res) {
    if (!req.params.id) {
        return res.render('article', {
            react: '系统维护中。。。',
            initialState: [],
            title: 'lidy的个人主页-文章详情',
        })
    }
    console.log(req.params.id);
    Action.ArticleDetail({
        params: {
            id: req.params.id
        }
    }).then(
        data => {
            try {
                var props = {
                    articleDetail: data.data
                }
                const html = ReactDOM.renderToString(React.createElement(Article, props));
                console.log('dsd');
                return res.render('article', {
                    react: html,
                    initialState: props,
                    title: 'lidy的个人主页-首页',
                })
            } catch (e) {
                console.log(e);
            }
        }
    );
}