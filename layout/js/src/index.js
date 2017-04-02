import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';

import RoutedPage from './pageFrame/RoutedPage';
import * as reducers from './reducers/reducers';
import {dispatchLogger} from './utils/helpers';

const store = createStore(
    combineReducers(reducers),
    applyMiddleware(dispatchLogger, thunk)
);

ReactDOM.render(
    <Provider store={store}>
        <RoutedPage />
    </Provider>,
    document.getElementById('application-root')
);
