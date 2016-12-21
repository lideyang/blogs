/**
 * Created by lidy on 2016/12/18.
 */
import SearchComponent from '../js/pages/search';
import View from './view'
import Action from '../api';
export default (req, res) => {
    if (!req.params.keyword) {
        return res.redirect('/');
    }
    var page = req.query.p ? parseInt(req.query.p) : 1;
    Action.Search({
        params: {
            p: page,
            keyword: req.params.keyword
        }
    }).then(
        response => {
            var data = response.data;
            View(req, res, 'search', '搜索文章', {
                props: {
                    list:data
                },
                Component: SearchComponent
            })
        }
    );
}