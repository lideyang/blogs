/**
 * Created by Lidy on 2016/12/20.
 */
import Reg from '../js/pages/reg'
import View from './view'
import RegComponent from '../js/pages/reg'
import LoginComponent from '../js/pages/login'

export function Register(req, res) {
    View(req, res, 'reg', '注册', {
        Component: RegComponent
    })
}

export function Login(req, res) {
    View(req, res, 'login', '登录', {
        Component: LoginComponent
    })
}
export function Logout(req, res) {
    res.clearCookie('token');
    res.redirect('/login');//登出成功后跳转到登录页
}