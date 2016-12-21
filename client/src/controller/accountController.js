/**
 * Created by Lidy on 2016/12/20.
 */
import React from 'react'
import ReactDOM from 'react-dom/server'
import Reg from '../js/pages/reg'
import LoginComponent from '../js/pages/login'

export function Register(req, res) {
    const html = ReactDOM.renderToString(React.createElement(Reg));
    return res.render('reg', {
        react: html,
        initialState: [],
        title: 'lidy的个人主页-注册',
    })
}

export function Login(req, res) {
    const html = ReactDOM.renderToString(React.createElement(LoginComponent));
    return res.render('login', {
        react: html,
        initialState: [],
        title: 'lidy的个人主页-登录',
    })
}
export function Logout(req, res) {
    res.clearCookie('token');
    res.redirect('/login');//登出成功后跳转到登录页
}