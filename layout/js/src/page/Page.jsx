import React from 'react';
import PropTypes from 'prop-types';
import SinglePageApplication from './SinglePageApplication';
import {drawer} from 'material-components-web';
import {Link} from 'react-router-dom';

require('./Page.scss');

export default class Page extends React.Component {
    constructor() {
        super();
        this.drawer = undefined;
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        this.drawer = new drawer.MDCTemporaryDrawer(document.querySelector('.mdc-temporary-drawer'));
    }

    logout(e) {
        e.preventDefault();
        if (window.gapi !== undefined) {
            window.gapi.load('auth2', () => {
                window.gapi.auth2.init().then(() => {
                    const instance = window.gapi.auth2.getAuthInstance();
                    if (!instance.currentUser.get().isSignedIn()) {
                        // do not sign out the user if he isn't signed in
                        window.location.href = "/logout";
                        return;
                    }
                    instance.signOut().then(() => {
                        window.location.href = "/logout";
                        return;
                    });
                });
            });
        } else {
            window.location.replace('/logout');
        }
    }

    render() {
        return (
            <div id="suluvir-root">
                <div className="mdc-toolbar mdc-toolbar--fixed">
                    <div className="mdc-toolbar__row">
                        <section className="mdc-toolbar__section mdc-toolbar__section--align-start">
                        <button className="material-icons mdc-toolbar__icon--menu" onClick={() => this.drawer.open = true}>menu</button>
                        <span className="mdc-toolbar__title catalog-title">Suluvir</span>
                        </section>
                    </div>
                </div>

                <aside className="mdc-temporary-drawer">
                    <nav className="mdc-temporary-drawer__drawer">
                        <header className="mdc-temporary-drawer__header">
                        <div className="mdc-temporary-drawer__header-content mdc-theme--primary-bg mdc-theme--text-primary-on-primary">
                            Suluvir
                        </div>
                        </header>
                        <nav className="mdc-temporary-drawer__content mdc-list-group">
                            <div id="icon-with-text-demo" className="mdc-list">
                                <Link className="mdc-list-item" to="/">
                                    <i className="material-icons mdc-list-item__start-detail" aria-hidden="true">home</i> 
                                    Home
                                </Link>
                                <Link className="mdc-list-item" to="/artists">
                                    <i className="material-icons mdc-list-item__start-detail" aria-hidden="true">person</i> 
                                    Artists
                                </Link>
                                <Link className="mdc-list-item" to="/albums">
                                    <i className="material-icons mdc-list-item__start-detail" aria-hidden="true">album</i>
                                    Albums
                                </Link>
                                <Link className="mdc-list-item" to="/songs">
                                    <i className="material-icons mdc-list-item__start-detail" aria-hidden="true">music_note</i> 
                                    Songs
                                </Link>
                                <Link className="mdc-list-item" to="/playlists">
                                    <i className="material-icons mdc-list-item__start-detail" aria-hidden="true">list</i> 
                                    Playlists
                                </Link>
                            </div>

                            <hr className="mdc-list-divider"/>

                            <div className="mdc-list">
                                <Link className="mdc-list-item" to="/profile">
                                    <i className="material-icons mdc-list-item__start-detail" aria-hidden="true">person</i> 
                                    Profile
                                </Link>
                                <Link className="mdc-list-item" to="/upload">
                                    <i className="material-icons mdc-list-item__start-detail" aria-hidden="true">cloud_upload</i> 
                                    Upload
                                </Link>
                            </div>

                            <hr className="mdc-list-divider"/>

                            <div className="mdc-list">
                                <a className="mdc-list-item" onClick={this.logout} href="/logout">
                                    <i className="material-icons mdc-list-item__start-detail" aria-hidden="true">power_settings_new</i> 
                                    Logout
                                </a>
                            </div>
                        </nav>
                    </nav>
                </aside>

                <main className="mdc-toolbar-fixed-adjust">
                    <SinglePageApplication component={this.props.component} {...this.props}/>
                </main>
            </div>
        )
    }
}

Page.propTypes = {
    component: PropTypes.any.isRequired
}
