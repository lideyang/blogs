require('es6-promise').polyfill()
import axios from 'axios'
import {API_ROOT} from '../config'
import {getCookie, signOut} from '../js/utils/authService'

axios.defaults.baseURL = API_ROOT
axios.defaults.withCredentials = true

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    config.headers = config.headers || {}
    if (getCookie('token')) {
        config.headers.Authorization = 'Bearer ' + getCookie('token').replace(/(^\")|(\"$)/g, '')
    }
    return config
}, function (error) {
    // Do something with request error
    return Promise.reject(error)
})

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    if (response.status === 401) {
        signOut()
        window.location.pathname = '/login'
    }
    //console.log(response.data);
    return response;
}, function (error) {
    // Do something with response error
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
