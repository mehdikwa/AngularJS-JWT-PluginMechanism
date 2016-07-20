'use strict';

/**
 * contentTypeSetterInterceptor factory
 * @memberOf App.Core.Services
 */

/**
 * @name contentTypeSetterInterceptor
 * @desc [hack] Set Content-type, because angular remove it when there's no data
 * @param {Object} $rootScope Angular root scope
 * @param {Object} $q Promise module
 * @param {Object} store Cookies module
 * @memberOf App.Core.Services
 * @returns {Object} The config
 */
export function contentTypeSetterInterceptor() {
    return {
        request: function (config) {
            if (angular.isDefined(config.headers['Content-Type']) && !angular.isDefined(config.data)) {
                config.data = '';
            }

            return config;
        },
    };
}
