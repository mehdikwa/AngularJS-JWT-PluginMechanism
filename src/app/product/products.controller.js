'use strict';

/**
 * Products controller
 * @namespace Controllers
 * @memberOf App.Product
 */

/**
 * @name ProductsController
 * @desc Products controller
 * @memberOf App.Product.Controllers
 * @returns {void}
 */
export class ProductsController {
    constructor(products) {
        'ngInject';

        this.products = products;
    }
}
