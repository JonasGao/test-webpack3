import {bootstrap, module} from 'angular';
import translate from 'angular-translate';
import uiBootstrap from 'angular-ui-bootstrap';
import routesModule from './routes';
import sidebarModule from './components/sidebar';
//import './assets/css/index.less';

const MAIN_MODULE = module('myApp', [
    translate,
    uiBootstrap,
    routesModule.name,
    sidebarModule.name]);

bootstrap(document, [MAIN_MODULE.name]);