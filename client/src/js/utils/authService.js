/**
 * Created by lidy on 2016/12/18.
 */
import cookie from 'react-cookie'
import {CookieDomain} from '../../config'
let cookieConfig = {}
if (CookieDomain !== '') {
    cookieConfig = {domain: CookieDomain}
}

export function saveCookie(name, value) {
    cookie.save(name, value)
}

export function getCookie(name) {
    return cookie.load(name)
}

export function removeCookie(name) {
    cookie.remove(name, cookieConfig)
}

export function signOut() {
    cookie.remove('token', cookieConfig)
}

export function isLogin(req) {
    return !!req.cookies.token
}