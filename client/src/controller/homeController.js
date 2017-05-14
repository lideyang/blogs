/**
 * Created by lidy on 2016/12/18.
 */
import HomeComponent from '../js/pages/home'
import Page404Component from '../js/pages/home'
import View from './view'
import Action from '../api'
export function Home(req, res) {
    var page = req.query.p ? parseInt(req.query.p) : 1;
    Action.ArticleList({
        params: {
            p: page
        }
    }).then(
        response => {
            var data = response.data;
            View(req, res, 'home', '首页', {
                Component: HomeComponent,
                props: {
                    articleList: data.data,
                    total: data.total
                }
            })
        },
        error=> {
            View(req, res, 'home', '首页', {
                Component: HomeComponent,
                props: {
                    articleList: [],
                    total: 0
                }
            })
        }
    );
}
export function Page404(req, res) {
    View(req, res, '404', '404', {
        Component: Page404Component
    })
}