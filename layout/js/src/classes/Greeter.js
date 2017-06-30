const MINIMUM_DEVTOOLS_SPACE = 100;

export default class Greeter {
    constructor() {
        this.greetAFellowDeveloperWhenDevtoolsAreOpen = this.greetAFellowDeveloperWhenDevtoolsAreOpen.bind(this);
        this.alreadyGreeted = false;

        this.greetAFellowDeveloperWhenDevtoolsAreOpen();

        window.onresize = this.greetAFellowDeveloperWhenDevtoolsAreOpen;
    }

    greetAFellowDeveloperWhenDevtoolsAreOpen() {
        if (this.areDevtoolsOpen() && !this.alreadyGreeted) {
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