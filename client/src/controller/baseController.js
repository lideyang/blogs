/**
 * Created by lidy on 2016/12/18.
 */
import React from 'react';
import ReactDOM from 'react-dom/server';

export default class baseController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
        this.view = this.view.bind(this);
    }

    view(name, option) {
        return this.res.render(name, {
            react: '系统维护中。。。',
            initialState: [],
            title: 'lidy的个人主页-首页',
        })
        var data = option.response.data;
        try {
            if (!data.success) {
                return res.render(name, {
                    react: '系统维护中。。。',
                    initialState: [],
                    title: 'lidy的个人主页-首页',
                })
            }
            var props = {
                articleList: data.data,
                total: data.total
            }
            const html = ReactDOM.renderToString(React.createElement(option.Component, props));
            return this.res.render(name, {
                react: html,
                initialState: props,
                title: 'lidy的个人主页-首页',
            })
        } catch (e) {
            console.error(e);
            return this.res.render(name, {
                react: e,
                initialState: [],
                title: 'lidy的个人主页-首页',
            })
        }
    }
}