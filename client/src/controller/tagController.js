/**
 * Created by lidy on 2016/12/19.
 */
import tagComponent from '../js/pages/tag'
import tagsComponent from '../js/pages/tags'
import tagsAddComponent from '../js/pages/tags'
import View from './view'
import Action from '../api'

export function Tag(req, res) {
    if (!req.params.tag) {
        return res.redirect('/');
    }
    Action.TagList({
        params: {
            tag: req.params.tag
        }
    }).then(
        response => {
            var data = response.data;
            View(req, res, 'tag', '标签分类', {
                Component: tagComponent,
                props: {
                    list: data.data
                }
            })
        }
    );
}

export function Tags(req, res) {
    Action.TagAll().then(
        response => {
            var data = response.data;
            View(req, res, 'tags', '标签分类', {
                Component: tagsComponent,
                props: {
                    tagList: data.data
                }
            })
        }
    );
}