/**
 * Created by lidy on 2016/12/18.
 */
import {ArticleResource} from './resources'

export default {
    ArticleList: function (data) {
        console.log(data);
        return ArticleResource('get', 'list', data);
    }
}