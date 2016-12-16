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
import routes from './routes.js'

import indexStore from './store/indexStore.js';

const app = express();
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));
app.listen(4000, () => {
    console.log(`listening at 4000`);
})

app.get('/dist/js/vendor.dll.js', (req, res) => {
    res.sendFile('/vendor.dll.js', { root: __dirname + `/../dist/js` });
})

app.get('/dist/js/client.bundle.js', (req, res) => {
    res.sendFile('/client.bundle.js', { root: __dirname + `/../dist/js` });
})

app.get('/',  (req, res) => {
    req.cookies.user =  req.cookies.user || (new Date()).getTime();
    console.log(req.cookies.user);
    match({ routes: routes, location: req.url }, async (err, redirect, props) => {
        // dirty list
        req.dirty = ['/'];
        let testHtml = renderToString(<RouterContext {...props} />)
        res.send(indexPage(testHtml));
    })
})

const indexPage = (html) => {
    return `
        <!doctype html>
        <html lang="utf-8">
            <head>
                <script>
                </script>
            </head>
            <body>
                <div id="root" >${html}</div>
            </body>
            <script src="/dist/js/vendor.dll.js"></script>
            <script src="/dist/js/client.bundle.js"></script>
        </html>
    `
}

app.get('/todo',  (req, res) => {
    match({ routes: routes, location: req.url }, async (err, redirect, props) => {

        let indexStore = indexStore.init();
        // fetch before render
        await indexStore.addTodo(`hzp`);

        Object.assign(props.router, {indexStore: indexStore});

        const d = renderToString(<RouterContext {...props} />)
        res.send(indexPage(d, storePage));
    })
})

const storePage = (html, initialState) => {
    return `
        <!doctype html>
        <html lang="utf-8">
            <head>
                <script>
                    window.__state__ = ${JSON.stringify(initialState)};
                </script>
            </head>
            <body>
                <div id="root" >${html}</div>
            </body>
            <script src="/dist/js/vendor.dll.js"></script>
            <script src="/dist/js/client.bundle.js"></script>
        </html>
    `
}