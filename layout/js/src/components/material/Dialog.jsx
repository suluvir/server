import React from 'react';
import PropTypes from 'prop-types';
import {dialog} from 'material-components-web';

import Button from './Button';

let id = 1;

export default class Dialog extends React.PureComponent {
    constructor() {
        super();

        this.id = Dialog.newId();

        this.cancel = this.cancel.bind(this);
    }

    static newId() {
        return `suluvir-dialog-id-${id++}`;
    }

    componentDidMount() {
        this.dialog = new dialog.MDCDialog(this.dialogNode);
        this.dialog.listen('MDCDialog:cancel', this.cancel);
    }

    componentWillUpdate(nextProps) {
        if (nextProps.show) {
            this.dialog.show();
        } else {
            this.dialog.close();
        }
    }

    cancel(e) {
        if (this.props.onCancel !== undefined) {
            this.props.onCancel(e);
        }
    }

    showSubmit() {
        return this.props.onSubmit !== undefined;
    }

    render() {
        const {show, title, children, onSubmit} = this.props;

        const submitButton = !this.showSubmit() ? undefined :
            <Button className="mdc-dialog__footer__button--accept" raised onClick={onSubmit}>Submit</Button>;

        return (
            <div className="suluvir-dialog">
                <aside id={this.id}
                    ref={dialogNode => this.dialogNode = dialogNode}
                    className="mdc-dialog"
                    role="alertdialog"
                    aria-hidden={show ? 'false' : 'true'}
                    aria-labelledby="mdc-dialog-default-label"
                    aria-describedby="mdc-dialog-default-description">
                    <div className="mdc-dialog__surface">
                    <header className="mdc-dialog__header">
                        <h2 id="mdc-dialog-default-label" className="mdc-dialog__header__title">
                        {title}
                        </h2>
                    </header>
                    <section id="mdc-dialog-default-description" className="mdc-dialog__body">
                        {children}
                    </section>
                    <footer className="mdc-dialog__footer">
                        {submitButton}
                        <Button className="mdc-dialog__footer__button--cancel" raised onClick={this.cancel}>Cancel</Button>
                    </footer>
                    </div>
                    <div className="mdc-dialog__backdrop"></div>
                </aside>
            </div>
        );
    }
}

Dialog.propTypes = {
    additionalButtons: PropTypes.array.isRequired,
    children: PropTypes.any.isRequired,
    title: PropTypes.string,
    show: PropTypes.bool.isRequired,
    onCancel: PropTypes.func,
    onSubmit: PropTypes.func
};

Dialog.defaultProps = {
    additionalButtons: [],
    show: false
};