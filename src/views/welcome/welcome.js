import {module} from 'angular';

export default module('myApp.welcome', []).controller('WelcomeController', class WelcomeController {
    constructor() {
        this.message = 'Hello World!';
    }
});