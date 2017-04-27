import React from 'react';
import {Icon, Textfield} from 'react-mdl';

require('./IconTextfield.scss');

export default class IconTextfield extends React.PureComponent {
    render() {
        const {error, iconName, label, onChange, pattern, value, required, type} = this.props;
        return (
            <div className="suluvir-icon-textfield">
                <Icon name={iconName} />
                <Textfield
                    error={error}
                    floatingLabel
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
    error: React.PropTypes.string,
    iconName: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func,
    pattern: React.PropTypes.string,
    required: React.PropTypes.bool.isRequired,
    type: React.PropTypes.string,
    value: React.PropTypes.string
}

IconTextfield.defaultProps = {
    required: false
}