/**
 * Created by lidy on 2016/12/18.
 */
const ENV = process.env.NODE_ENV === 'production';
module.exports = {
    Host: ENV ? 'http://www.lideyang.net/' : 'http://localhost:4000/',
    ImageHost: ENV ? 'http://img.lideyang.net/' : 'http://img.lideyang.net/',
    API_ROOT: ENV ? 'http://www.lideyang.net/api' : 'http://localhost:9001/api',
    CookieDomain: ENV ? '.lideyang.net' : ''
};