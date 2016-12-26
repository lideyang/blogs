require('es6-promise').polyfill()
import axios from 'axios'
import {API_ROOT} from '../config'
import {getCookie, signOut} from '../js/utils/authService'

axios.defaults.baseURL = API_ROOT
axios.defaults.withCredentials = true
axios.defaults.timeout = 3000
console.log('api:' + API_ROOT);
// 返回处理
axios.interceptors.response.use(function (response) {
    if (response.status === 401) {
        signOut()
        window.location.pathname = '/login'
    }
    //console.log(response.data);
    return response;
}, function (error) {
    console.log('response' + error);
    return Promise.reject(error)
})

export const AccountResource = (method, id, data, api = 'account') => {
    return axios[method](api + (id ? ( '/' + id) : ''), data)
}
export const ArchiveResource = (method, id, data, api = 'archive') => {
    return axios[method](api + (id ? ( '/' + id) : ''), data)
}
export const ArticleResource = (method, id, data, api = 'article') => {
    return axios[method](api + (id ? ( '/' + id) : ''), data)
}
export const CommentResource = (method, id, data, api = 'comment') => {
    return axios[method](api + (id ? ( '/' + id) : ''), data)
}
export const SearchResource = (method, id, data, api = 'search') => {
    return axios[method](api + (id ? ( '/' + id) : ''), data)
}
export const SortResource = (method, id, data, api = 'sort') => {
    return axios[method](api + (id ? ( '/' + id) : ''), data)
}
export const TagResource = (method, id, data, api = 'tag') => {
    return axios[method](api + (id ? ( '/' + id) : ''), data)
}
export const UserResource = (method, id, data, api = 'user') => {
    return axios[method](api + (id ? ( '/' + id) : ''), data)
}
