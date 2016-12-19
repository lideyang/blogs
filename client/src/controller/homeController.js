/**
 * Created by lidy on 2016/12/18.
 */
import React from 'react';
import ReactDOM from 'react-dom/server';
import Home from '../js/pages/home';
import Action from '../api';
export default (req, res) => {
    var page = req.query.p ? parseInt(req.query.p) : 1;
    GetArticleList(page).then(
        data => {
            try {
                if (!data.success) {
                    return res.render('home', {
                        react: '系统维护中。。。',
                        initialState: [],
                        title: 'lidy的个人主页-首页',
                    })
                }
                var props = {
                    articleList: data.data,
                    total: data.total
                }
                const html = ReactDOM.renderToString(React.createElement(Home, props));
                return res.render('home', {
                    react: html,
                    initialState: props,
                    title: 'lidy的个人主页-首页',
                })
            } catch (e) {
                console.error(e);
                return res.render('home', {
                    react: e,
                    initialState: [],
                    title: 'lidy的个人主页-首页',
                })
            }
        }
    );
}
const GetArticleList = async(page) => {
    const response = await Action.ArticleList({
        params: {
            p: page
        }
    });
    return response.data;
}