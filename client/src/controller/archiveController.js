/**
 * Created by lidy on 2016/12/18.
 */
import React from 'react';
import ReactDOM from 'react-dom/server';
import ArchiveComponent from '../js/pages/archive';
import Action from '../api';
export default (req, res)=> {
    var page = req.query.p ? parseInt(req.query.p) : 1;
    Action.ArchiveList({
        params: {
            p: page
        }
    }).then(
        response => {
            var data = response.data;
            try {
                console.log(data);
                if (!data.success) {
                    return res.render('archive', {
                        react: '系统维护中。。。',
                        initialState: [],
                        title: 'lidy的个人主页-存档',
                    })
                }

                var props = {
                    archiveList: data.data,
                    total: data.total
                }
                const html = ReactDOM.renderToString(React.createElement(ArchiveComponent, props));
                return res.render('archive', {
                    react: html,
                    initialState: props,
                    title: 'lidy的个人主页-存档',
                })
            } catch (e) {
                console.error(e);
                return res.render('archive', {
                    react: e,
                    initialState: [],
                    title: 'lidy的个人主页-存档',
                })
            }
        }
    );
}