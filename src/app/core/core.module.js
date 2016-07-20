'use strict';

import { config } from './config';
import { run } from './run';
import { CoreService } from './service';
import { contentTypeSetterInterceptor } from './contentTypeSetterInterceptor.service';
import { authHttpInterceptor } from './authHttpInterceptor.service';
import { CoreController } from './controller';

/**
 * App core module
 * @namespace Core
 * @memberOf App
 */

const core = angular.module('app.core', [
    'ui.router',
    'restangular',
])
    .config(config)

    .run(run)

    .service('CoreService', CoreService)

    .factory('contentTypeSetterInterceptor', contentTypeSetterInterceptor)
    .factory('authHttpInterceptor', authHttpInterceptor)

    .controller('CoreController', CoreController);

/* eslint-disable */
const getJSON = function(url, successHandler, errorHandler) {
    const xhr = typeof XMLHttpRequest != 'undefined'
        ? new XMLHttpRequest()
        : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open('get', url, true);
    xhr.responseType = 'json';
    xhr.onreadystatechange = function() {
        let status;
        let data;
        if (xhr.readyState == 4) {
            status = xhr.status;

            if (status == 200) {
                successHandler && successHandler(xhr.response);
            } else {
                errorHandler && errorHandler(status);
            }
        }
    };

    xhr.send();
};
/* eslint-enable */

getJSON('/api/modules.json', (modules) => {
    core.constant('MODULES', modules);

    angular.bootstrap(document, ['app']);
}, (e) => {
    /* eslint-disable no-console */ console.error(e); /* eslint-enable no-console */
});
