/**
 * Created by Lidy on 2016/12/15.
 */
import React from 'react';
import {match, RouterContext} from 'react-router';
import {renderToString} from 'react-dom/server';
import routes from './routes'
import IndexStore from './js/store/indexStore.js';


// async function fetchAllData(dispatch, components, params) {
//     const needs = components
//         .filter(x=>x.fetchData)
//         .reduce((prev,current)=>{
//             return current.fetchData(params).concat(prev)
//         },[])
//         .map(x=>{
//             return dispatch(x)
//         })
//     return await Promise.all(needs)
// }

export default function render(req, res) {
    match({routes: routes(), location: req.url}, (err, redirect, props) => {
        if (err) {
            res.status(500).send(err.message)
        } else if (redirect) {
            res.redirect(302, redirect.pathname + redirect.search)
        } else if (props) {
            console.log(req.url);
            let indexStore = IndexStore.init();
            console.log('dsd');
            // fetch before render
            indexStore.addTodo(`hzp`);
            console.log('ggg');
            Object.assign(props.router, {indexStore: indexStore});
            //console.log(routes);
            const InitialView = (
                <RouterContext {...props} />
            );
            const html = renderToString(InitialView);
            console.log('ddd');
            res.send(indexPage(html, indexStore));
        } else {
            res.status(404).send('Not Found')
        }
    })
}
const indexPage = (html, initialState) => {
    return `
        <!doctype html>
        <html lang="utf-8">
            <head>
                <title>lidy的个人主页</title>
                <link rel='stylesheet' href='/dist/css/base.css'/>
                <script>
                    window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
                </script>
            </head>
            <body>
                <div id="main_loading">
                    <p id="loading-one">载入中</p>
                </div>
                <div id="root" >${html}</div>
            </body>
            <script src="/dist/js/vendor.dll.js"></script>
            <script src="/dist/js/app.js"></script>
        </html>
    `
}