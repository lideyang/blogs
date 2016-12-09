/**
 * Created by Lidy on 2016/12/9.
 */
var getUrlToId = function () {
    var url = window.location.pathname;
    return url.substring(url.lastIndexOf('/') + 1);
}
export default getUrlToId;