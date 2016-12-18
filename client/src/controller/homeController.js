/**
 * Created by lidy on 2016/12/18.
 */
import React from 'react';
import ReactDOM from 'react-dom/server';
import Home from '../js/pages/home';
import Action from '../api';
export default (req, res) => {
    GetArticleList().then(
        data => {
            try {
                if (!data.success) {
                    return res.render('index', {
                        react: '系统维护中。。。',
                        title: 'lidy的个人主页-首页',
                    })
                }
                var props = {
                    articleList: data.data,
                    total: data.total
                }
                const html = ReactDOM.renderToString(React.createElement(Home, props));
                return res.render('index', {
                    react: html,
                    title: 'lidy的个人主页-首页',
                })
            } catch (e) {
                console.error(e);
                return res.render('index', {
                    react: e,
                    title: 'lidy的个人主页-首页',
                })
            }

        }
    );
}
const GetArticleList = async() => {
    const response = await Action.ArticleList('go2');
    return response.data;
}