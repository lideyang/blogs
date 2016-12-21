/**
 * Created by lidy on 2016/12/18.
 */
import userArticleComponent from '../js/pages/userArticle'
import View from './view'
import Action from '../api'

export default (req, res) => {
    var userName = req.params.name;
    if (!userName) {
        return res.redirect('/');
    }
    var page = req.query.p ? parseInt(req.query.p) : 1;
    Action.UserArticleList({
        params: {
            p: page,
            name: userName
        }
    }).then(
        response => {
            var data = response.data;
            View(req, res, 'userArticle', userName + '的文章列表', {
                Component: userArticleComponent,
                props: {
                    list: data.data,
                    total: data.total,
                    userName: data.userName
                }
            })
        }
    );
}