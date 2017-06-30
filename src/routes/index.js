import {module} from 'angular';
import uiRouter from '@uirouter/angularjs';
import welcomeModule from '../views/welcome/welcome';

export default module('myApp.routes', [uiRouter, welcomeModule.name]).config(['$stateProvider', '$locationProvider', '$urlRouterProvider',
    ($stateProvider, $locationProvider, $urlRouterProvider) => {

        $locationProvider.hashPrefix('!123456');

        $urlRouterProvider.otherwise('/welcome');

        $stateProvider.state('welcome', {
            url: '/welcome',
            templateUrl: 'views/welcome/welcome.html',
            controller: 'WelcomeController',
            controllerAs: 'welcome'
        });
    }]);