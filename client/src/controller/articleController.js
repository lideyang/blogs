/**
 * Created by lidy on 2016/12/19.
 */
import React from 'react';
import ReactDOM from 'react-dom/server';
import Article from '../js/pages/articleDetail';
import ArticleAdd from '../js/pages/articleAdd';
import Action from '../api';

export default (req, res)=>  {
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
        data => {
            try {
                var props = {
                    articleDetail: data.data
                }
                const html = ReactDOM.renderToString(React.createElement(Article, props));
                console.log('dsd');
                return res.render('articleDetail', {
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
export function PostController(req, res) {
    const html = ReactDOM.renderToString(React.createElement(ArticleAdd));
    return res.render('articleAdd', {
        react: html,
        initialState: [],
        title: 'lidy的个人主页-注册',
    })
}