import React from 'react';
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
    additionalButtons: React.PropTypes.array.isRequired,
    children: React.PropTypes.any.isRequired,
    title: React.PropTypes.string,
    show: React.PropTypes.bool.isRequired,
    onCancel: React.PropTypes.func,
    onSubmit: React.PropTypes.func
};

Dialog.defaultProps = {
    additionalButtons: [],
    show: false
};