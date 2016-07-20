'use strict';

/**
 * UserService service
 * @namespace Services
 * @memberOf App.User
 */

/**
 * @name UserService
 * @desc Expose multiple fpreferredLanguageunction used to communicate with user endpoints
 * @param {Object} $q Promise module
 * @param {Object} store Cookies module
 * @param {Object} Restangular $http wrapper
 * @memberOf App.User.Services
 * @returns {Object} The different calls
 */
export class UserService {
    constructor($q, store, Restangular) {
        'ngInject';

        this.$q = $q;
        this.store = store;
        this.Restangular = Restangular;
    }

    login(user) {
        const deferred = this.$q.defer();

        this.Restangular.all('login/signup').post(user).then((data) => {
            const userData = data.plain();

            this.store.set('user.token', userData.token);

            deferred.resolve(userData);
        }).catch((e) => {
            deferred.reject(e);
        });

        return deferred.promise;
    }

    getPolicies() {
        return this.Restangular.one('policies/current').get();
    }

    refreshToken() {
        const deferred = this.$q.defer();

        this.Restangular.one('refresh').get().then((data) => {
            const user = data.plain();

            this.store.set('user.token', user.token);

            deferred.resolve();
        }).catch((e) => {
            deferred.reject(e);
        });

        return deferred.promise;
    }
}
