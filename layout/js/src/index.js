import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import {getStore} from './utils/redux';

import RoutedPage from './page/RoutedPage';

ReactDOM.render(
    <Provider store={getStore()}>
        <RoutedPage />
    </Provider>,
    document.getElementById('application-root')
);
