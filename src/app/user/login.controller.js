'use strict';

/**
 * Login controller
 * @namespace Controllers
 * @memberOf App.User
 */

/**
 * @name LoginController
 * @desc Login controller
 * @memberOf App.User.Controllers
 * @returns {void}
 */
export class LoginController {
    constructor($state, $translate, toaster, UserService) {
        'ngInject';

        this.$state = $state;
        this.$translate = $translate;
        this.toaster = toaster;
        this.UserService = UserService;
        this.user = {};
    }

    login(form) {
        if (form.$valid) {
            this.UserService.login(this.user).then(() => {
                this.$translate('users.logged').then((translation) => {
                    this.toaster.pop('success', '', translation, null, 'trustedHtml');
                });

                this.$state.go('dashboard');
            });
        }
    }
}
