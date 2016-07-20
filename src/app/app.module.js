'use strict';

/* eslint-disable no-unused-vars */
import { core } from './core/core.module';
import { product } from './product/product.module';
import { user } from './user/user.module';
import { highchartWidgets } from './highchartWidgets/highchartWidgets.module';

/**
 * App module
 * @namespace App
 */

const app = angular.module('app', [
    'ngMaterial',
    'oc.lazyLoad',
    'sasrio.angular-material-sidenav',
    'angular-storage',
    'angular-jwt',
    'toaster',
    'pascalprecht.translate',
    'app.core',
    'app.product',
    'app.user',
    'app.hcwidgets'
]);
/* eslint-enable no-unused-vars */
