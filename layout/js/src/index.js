// Suluvir streaming server
// Copyright (C) 2018  Jannis Fink
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, version 3.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {createMuiTheme} from 'material-ui/styles';
import {red} from 'material-ui/colors';

import {getStore} from './utils/redux';

import RoutedPage from './page/RoutedPage';

require('./utils.scss');

const primaryPalette = {
    50: '#92e1f4',
    100: '#6ac7dd',
    200: '#38adc9',
    300: '#3994aa',
    400: '#397d8e',
    500: '#337180',
    600: '#2a5e6b',
    700: '#124a58',
    800: '#0b4452',
    900: '#093844',
    A100: '#337180',
    A200: '#337180',
    A400: '#337180',
    A700: '#0b4452',
    contrastDefaultColor: 'light',
};

const theme = createMuiTheme({
    palette: {
      primary: primaryPalette,
      secondary: red,
    },
});

ReactDOM.render(
    <Provider store={getStore()}>
        <MuiThemeProvider theme={theme}>
            <RoutedPage />
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('application-root')
);
