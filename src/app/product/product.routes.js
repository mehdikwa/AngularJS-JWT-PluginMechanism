'use strict';

/**
 * App product config function
 * @memberOf App.Product
 */

/**
 * @name config
 * @desc Config function of app.core module
 * @param {Object} $stateProvider ui-router provider
 * @memberOf App.Product
 * @returns {void}
 */
export /* @ngInject */ function config($stateProvider) {
    $stateProvider
        .state('products', {
            url: '/products',
            templateUrl: 'app/product/products.html',
            controller: 'ProductsController',
            controllerAs: 'vm',
        })

        .state('products-react', {
            url: '/products-react',
            templateUrl: 'app/product/products-react.html',
            controller: 'ProductsReactController',
            controllerAs: 'vm',
        });
}
