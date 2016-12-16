/**
 * Created by Lidy on 2016/12/9.
 */
var ObjectParamToStr = function (str) {
    let result = '';
    for (let item in str) {
        result += item + '=' + str[item] + '&';
    }
    return result;
}
export default ObjectParamToStr;