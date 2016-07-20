'use strict';

/**
 * App user config function
 * @memberOf App.User
 */

/**
 * @name config
 * @desc Config function of app.core module
 * @param {Object} $stateProvider ui-router provider
 * @memberOf App.User
 * @returns {void}
 */
export /* @ngInject */ function config($stateProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'app/user/login.html',
            controller: 'LoginController',
            controllerAs: 'vm',
        })

        .state('logout', {
            url: '/logout',
        });
}
