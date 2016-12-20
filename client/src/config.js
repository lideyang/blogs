/**
 * Created by lidy on 2016/12/18.
 */
const ENV = process.env.NODE_ENV === 'production';
module.exports = {
    Host: ENV ? 'http://www.lideyang.net/' : 'http://localhost:8080/',
    ImageHost: ENV ? 'http://img.lideyang.net/' : 'http://localhost:8080/',
    API_ROOT: ENV ? 'http://api.lideyang.net/api' : 'http://localhost:9001/api',
    CookieDomain: ENV ? '.lideyang.net' : 'http://localhost:9001/'
};