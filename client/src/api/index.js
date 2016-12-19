/**
 * Created by lidy on 2016/12/18.
 */
import {ArticleResource} from './resources'

export default {
    ArticleList: function (data) {
        return ArticleResource('get', 'list', data);
    },
    ArticleDetail:function(data){
        return ArticleResource('get', 'detail', data);
    }
}