/**
 * Created by lidy on 2016/12/18.
 */
import Home from '../js/pages/home'
import View from './view'
import Action from '../api'
export default (req, res)=> {
    var page = req.query.p ? parseInt(req.query.p) : 1;
    Action.ArticleList({
        params: {
            p: page
        }
    }).then(
        response => {
            var data = response.data;
            View(req,res,'home','首页',{
                Component: Home,
                props:{
                    articleList: data.data,
                    total: data.total
                }
            })
        }
    );
}
export function Page404(req, res) {
    return res.render('home', {
        react: '系统维护中。。。',
        initialState: [],
        title: 'lidy的个人主页-首页',
    })
}