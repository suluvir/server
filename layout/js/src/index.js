import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';

// import {Page} from './pageFrame/Page';
import * as reducers from './reducers/reducers';

const store = createStore(
    combineReducers(reducers),
    applyMiddleware(thunk)
);

ReactDOM.render(
    <Provider store={store}>
        <div/>
    </Provider>,
    document.getElementById('application-root')
);
