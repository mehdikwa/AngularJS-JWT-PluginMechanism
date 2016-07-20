'use strict';

import { config } from './user.routes';
import { UserService } from './user.service';
import { LoginController } from './login.controller';

/**
 * App user module
 * @namespace User
 * @memberOf App
 */

angular.module('app.user', [
    'ui.router',
])
    .config(config)

    .service('UserService', UserService)

    .controller('LoginController', LoginController);
