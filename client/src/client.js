/**
 * Created by Lidy on 2016/12/16.
 */
import {Router, browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import React, {PureComponent} from 'react';
import {render} from 'react-dom';
import routes from './routes';
import configureStore from './js/store/configureStore';
import createDevTools from './createDevtools';

const initialState = window.__INITIAL_STATE__
const store = configureStore(initialState,browserHistory)
const history = syncHistoryWithStore(browserHistory, store)

createDevTools(store);

render(
    <Provider store={store}>
        <Router history={history}>
            {routes()}
        </Router>
    </Provider>,
    document.getElementById('root')
)