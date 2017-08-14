import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import {getStore} from './utils/redux';

import RoutedPage from './page/RoutedPage';

require('./mdc.scss');
require('./utils.scss');

ReactDOM.render(
    <Provider store={getStore()}>
        <RoutedPage />
    </Provider>,
    document.getElementById('application-root')
);
