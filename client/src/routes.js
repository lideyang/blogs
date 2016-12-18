/**
 * Created by Lidy on 2016/12/16.
 */
import { Route, IndexRoute } from 'react-router';
import React from 'react';
import {Loading} from './js/components';
import App from './js/pages/app';
import Home from './js/pages/home';


export default () => (

    <Route path="/" component={ App }>
        {/*<IndexRoute component={Home}/>*/}
    </Route>
)