/**
 * Created by lidy on 2016/12/18.
 */
import ArchiveComponent from '../js/pages/archive'
import View from './view'
import Action from '../api'

export default (req, res)=> {
    var page = req.query.p ? parseInt(req.query.p) : 1;
    Action.ArchiveList({
        params: {
            p: page
        }
    }).then(
        response => {
            var data = response.data;
            View(req, res, 'archive', '文章存档', {
                Component: ArchiveComponent,
                props: {
                    archiveList: data.data,
                    total: data.total
                }
            })
        }
    );
}