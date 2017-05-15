import React from 'react';
import Immutable from 'immutable';
import {connect} from 'react-redux';

import Error from './Error';

class ErrorList extends React.PureComponent {
    render() {
        const {errors} = this.props;
        const display = [];
        
        errors.forEach(error => display.push(
            <Error
                details={error.get('details')}
                message={error.get('message')}
                status={error.get('status')}
            />
        ));

        return (
            <div>
                {display}
            </div>
        );
    }
}

ErrorList.propTypes = {
    errors: React.PropTypes.instanceOf(Immutable.Map).isRequired
}

function mapStateToProps(state) {
    return {
        errors: state.errors
    };
}

export default connect(mapStateToProps)(ErrorList);