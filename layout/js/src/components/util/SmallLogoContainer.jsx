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
import PropTypes from 'prop-types';

import Paper from 'material-ui/Paper';

require('./SmallLogoContainer.scss');

export default class SmallLogoContainer extends React.PureComponent {
    render() {
        return (
            <Paper className="suluvir-small-logo-container" elevation={3}>
                <div>
                    <img src="/static/img/logo/svg/suluvir.svg" alt="Logo" className="suluvir-small-logo-container__logo"/>
                </div>

                {this.props.children}
            </Paper>
        );
    }
}

SmallLogoContainer.propTypes = {
    children: PropTypes.any.isRequired
};
