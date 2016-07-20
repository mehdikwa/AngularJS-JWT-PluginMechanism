'use strict';

import { config } from './product.routes';
import { ProductsController } from './products.controller';
import { ProductsReactController } from './products-react.controller';
import { products } from './products.factory';
import { reactTable } from './react-table.directive';

/**
 * App product module
 * @namespace User
 * @memberOf App
 */

angular.module('app.product', [
    'ui.router',
])
    .config(config)

    .controller('ProductsController', ProductsController)
    .controller('ProductsReactController', ProductsReactController)

    .factory('products', products)

    .directive('reactTable', reactTable);
