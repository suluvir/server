import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';

import {Page} from './pageFrame/Page';
import * as reducers from './reducers/reducers';

const store = createStore(
    combineReducers({
        play: reducers.play
    }),
    applyMiddleware(thunk)
);

ReactDOM.render(
    <Provider store={store}>
        <Page />
    </Provider>,
    document.getElementById('application-root')
);
