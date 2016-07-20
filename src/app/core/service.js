'use strict';

/**
 * CoreService service
 * @namespace Services
 * @memberOf App.Core
 */

/**
 * @name CoreService
 * @desc Expose multiple function used to load data regarding the whole app
 * @param {Object} Restangular $http wrapper
 * @memberOf App.Core.Services
 * @returns {Object} The different calls
 */
export class CoreService {
    constructor(Restangular) {
        'ngInject';

        this.Restangular = Restangular;
    }

    getModules() {
        return this.Restangular.all('modules.json').getList();
    }
}
