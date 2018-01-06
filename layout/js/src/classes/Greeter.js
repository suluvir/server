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

import {isDebugMode} from '../utils/helpers';

const MINIMUM_DEVTOOLS_SPACE = 100;

export default class Greeter {
    constructor() {
        this.greetAFellowDeveloperWhenDevtoolsAreOpen = this.greetAFellowDeveloperWhenDevtoolsAreOpen.bind(this);
        this.alreadyGreeted = false;

        this.greetAFellowDeveloperWhenDevtoolsAreOpen();

        window.onresize = this.greetAFellowDeveloperWhenDevtoolsAreOpen;
    }

    greetAFellowDeveloperWhenDevtoolsAreOpen() {
        if (!isDebugMode() && this.areDevtoolsOpen() && !this.alreadyGreeted) {
            this.alreadyGreeted = true;
            fetch('/static/greetingmessage.txt').then(response => {
                response.text().then(text => {
                    console.log(text); // eslint-disable-line
                });
            });
        }
    }

    areDevtoolsOpen() {
        return window.outerHeight - window.innerHeight > MINIMUM_DEVTOOLS_SPACE ||
            window.outerWidth - window.innerWidth > MINIMUM_DEVTOOLS_SPACE;
    }
}