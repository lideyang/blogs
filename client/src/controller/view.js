/**
 * Created by lidy on 2016/12/18.
 */
import React from 'react';
import ReactDOM from 'react-dom/server';

export default (req, res, name, title, option) => {
    try {
        var props = option.props || null;
        const html = ReactDOM.renderToString(React.createElement(option.Component, props));
        return res.render(name, {
            react: html,
            initialState: props,
            title: 'lidy的个人主页-' + title,
        })
    } catch (e) {
        console.error(e);
        return res.render(name, {
            react: e,
            initialState: [],
            title: 'lidy的个人主页-' + title,
        })
    }
}