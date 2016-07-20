'use strict';

/**
 * Core controller
 * @namespace Controllers
 * @memberOf App.Core
 */

/**
 * @name CoreController
 * @desc Core controller
 * @memberOf App.Core.Controllers
 * @returns {void}
 */
export class CoreController {
    constructor($rootScope, $ocLazyLoad, $mdSidenav, store, ssSideNav, jwtHelper, MODULES) {
        'ngInject';

        this.menu = ssSideNav;

        $rootScope.$watch(() => {
            return store.get('user.token');
        }, (token) => {
            if (token) {
                $rootScope.currentUser = jwtHelper.decodeToken(token);
                ssSideNav.sections[0].name = $rootScope.currentUser.name;
            }
        }, true);

        $rootScope.onClickMenu = function () {
            $mdSidenav('left').toggle();
        };

        // loads everything external modules to the angular app
        _(MODULES).each((module) => {
            $ocLazyLoad.load(module.path);
        });
    }
}
