/**
 * Created by lidy on 2016/12/18.
 */
export const Host = (process.env.NODE_ENV === 'production')
    ? 'http://www.lideyang.net/'
    :'http://localhost:8080/'

export const API_ROOT = (process.env.NODE_ENV === 'production')
    ? 'http://api.lideyang.net/api'
    :'http://localhost:9001/api'

export const CookieDomain = (process.env.NODE_ENV === 'production')
    ? '.lideyang.net'
    : 'http://localhost:9001/'