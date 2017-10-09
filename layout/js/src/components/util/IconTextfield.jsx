import React from 'react';
import PropTypes from 'prop-types';

import Textfield from '../material/Textfield';
import Icon from '../material/Icon';

require('./IconTextfield.scss');

export default class IconTextfield extends React.PureComponent {
    render() {
        const {error, iconName, label, onChange, pattern, value, required, type, autoFocus} = this.props;
        return (
            <div className="suluvir-icon-textfield">
                <Icon name={iconName} />
                <Textfield
                    autoFocus={autoFocus}
                    error={error}
                    label={label}
                    onChange={onChange}
                    pattern={pattern}
                    required={required}
                    type={type}
                    value={value}
                />
            </div>
        );
    }
}

IconTextfield.propTypes = {
    autoFocus: PropTypes.any,
    error: PropTypes.string,
    iconName: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    pattern: PropTypes.string,
    required: PropTypes.bool.isRequired,
    type: PropTypes.string,
    value: PropTypes.string
}

IconTextfield.defaultProps = {
    required: false
}