'use strict';

/**
 * Products controller, the react way
 * @namespace Controllers
 * @memberOf App.Product
 */

/**
 * @name ProductsReactController
 * @desc Products controller, the react way
 * @memberOf App.Product.Controllers
 * @returns {void}
 */
export class ProductsReactController {
    constructor(products) {
        'ngInject';

        this.products = products;
    }
}
