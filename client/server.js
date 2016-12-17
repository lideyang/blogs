/**
 * Created by Lidy on 2016/12/15.
 */
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';;
import session from 'express-session';
import React from 'react';
import { match, RouterContext } from 'react-router';
import { renderToString } from 'react-dom/server';
import routes from './src/routes.js'

import IndexStore from './src/js/store/indexStore.js';

const app = express();
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

app.use('/assets', express.static('public')); //静态资源
app.use('/dist', express.static('dist'));

// app.get('/dist/js/vendor.dll.js', (req, res) => {
//     res.sendFile('/vendor.dll.js', { root: __dirname + `/../dist/js` });
// })
//
// app.get('/dist/js/client.bundle.js', (req, res) => {
//     res.sendFile('/client.bundle.js', { root: __dirname + `/../dist/js` });
// })

// app.get('/',  (req, res) => {
//     req.cookies.user =  req.cookies.user || (new Date()).getTime();
//     console.log(req.cookies.user);
//     match({ routes: routes, location: req.url }, async (err, redirect, props) => {
//         // dirty list
//         req.dirty = ['/'];
//         let testHtml = renderToString(<RouterContext {...props} />)
//         res.send(indexPage(testHtml));
//     })
// })

// const indexPage = (html) => {
//     return `
//         <!doctype html>
//         <html lang="utf-8">
//             <head>
//                 <script>
//                 </script>
//             </head>
//             <body>
//                 <div id="root" >${html}</div>
//             </body>
//             <script src="/dist/js/vendor.dll.js"></script>
//             <script src="/dist/js/client.bundle.js"></script>
//         </html>
//     `
// }

app.get('/',  (req, res) => {
    match({ routes: routes, location: req.url }, async (err, redirect, props) => {
        console.log(req.url);
        let indexStore = IndexStore.init();
        console.log('dsd');
        // fetch before render
        await indexStore.addTodo(`hzp`);
        console.log('ggg');
        Object.assign(props.router, {indexStore: indexStore});
        console.log(routes);
        const html = renderToString(<RouterContext {...props} />);
        console.log('ddd');
        res.send(indexPage(html, indexStore));
    })
})

const indexPage = (html, initialState) => {
    return `
        <!doctype html>
        <html lang="utf-8">
            <head>
                <title>lidy的个人主页</title>
                <link rel='stylesheet' href='/dist/css/app.css'/>
                <script>
                    window.initState = ${JSON.stringify(initialState)};
                </script>
            </head>
            <body>
                <div id="main_loading">
                    <p id="loading-one">载入中</p>
                </div>
                <div id="root" >${html}</div>
            </body>
            <script src="/dist/js/vendor.dll.js"></script>
            <script src="/dist/js/client.bundle.js"></script>
        </html>
    `
}

app.listen(4000, () => {
    console.log(`listening at 4000`);
})