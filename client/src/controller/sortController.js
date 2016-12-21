/**
 * Created by lidy on 2016/12/18.
 */
import SortListComponent from '../js/pages/sortList'
import View from './view'
import Action from '../api'

export default (req, res) => {
    var page = req.query.p ? parseInt(req.query.p) : 1;
    if (!req.params.sort) {
        return res.redirect('/');
    }

    Action.SortList({
        params: {
            p: page,
            sort: req.params.sort
        }
    }).then(
        response => {
            var data = response.data;
            View(req, res, 'sortList', '文章分类', {
                props: {
                    list: data.data
                },
                Component: SortListComponent
            })
        }
    );
}