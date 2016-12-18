/**
 * Created by lidy on 2016/12/18.
 */
export const API_ROOT = (process.env.NODE_ENV === 'production')
    ? 'https://api.lideyang.net/api'
    :'http://localhost:9001/api'

export const CookieDomain = (process.env.NODE_ENV === 'production')
    ? '.lideyang.net'
    : 'http://localhost:9001/'