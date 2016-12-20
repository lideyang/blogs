/**
 * Created by Lidy on 2016/12/20.
 */
import React from 'react'
import ReactDOM from 'react-dom/server'
import Reg from '../js/pages/reg'
import Login from '../js/pages/login'

export function RegisterController(req, res) {
    const html = ReactDOM.renderToString(React.createElement(Reg));
    return res.render('reg', {
        react: html,
        initialState: [],
        title: 'lidy的个人主页-注册',
    })
}

export function LoginController(req, res) {
    const html = ReactDOM.renderToString(React.createElement(Login));
    return res.render('login', {
        react: html,
        initialState: [],
        title: 'lidy的个人主页-登录',
    })
}