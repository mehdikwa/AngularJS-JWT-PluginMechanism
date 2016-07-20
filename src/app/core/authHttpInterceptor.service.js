'use strict';

/**
 * authHttpInterceptor factory
 * @memberOf App.Core.Services
 */

/**
 * @name authHttpInterceptor
 * @desc Intercept requests, add an Authorization header if not present
 * @param {Object} $rootScope Angular root scope
 * @param {Object} $q Promise module
 * @param {Object} store Cookies module
 * @memberOf App.Core.Services
 * @returns {Object} The config
 */
export /* @ngInject */ function authHttpInterceptor($rootScope, $q, store) {
    return {
        request: function (config) {
            const token = store.get('user.token');
            config.headers = config.headers || {};

            if (!config.headers.hasOwnProperty('Authorization') && token) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
        },

        responseError: function (response) {
            let message = '';
            let description = '';

            /* eslint-disable no-console */
            console.log(response);
            /* eslint-enable no-console */

            switch (response.status) {
                case 401:
                case 0:
                    message = 'unauthorized';
                    break;

                default:
                    break;
            }

            if (typeof response.data.message === 'object') {
                const messages = _.map(response.data.message, (m) => `errors.${m}`);

                $rootScope.$broadcast(messages, description, response.status);
            }
            else {
                description = response.data.message;
                $rootScope.$broadcast(message, description, response.status);
            }

            return $q.reject(response);
        },
    };
}
