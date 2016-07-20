'use strict';

/**
 * Products factory
 * @memberOf App.Product.Services
 */

/**
 * @name products
 * @desc Mock data
 * @memberOf App.Product.Services
 * @returns {Object} Products
 */
export function products() {
    return [
        {
            index: 1,
            index_start_at: 56,
            integer: 16,
            float: 16.7107,
            name: 'Shirley',
            surname: 'Woods',
            fullname: 'Karen Creech',
            email: 'sarah@york.ng',
            bool: true,
        }, {
            index: 2,
            index_start_at: 57,
            integer: 17,
            float: 13.2845,
            name: 'Lucille',
            surname: 'Harmon',
            fullname: 'Lynne Pickett',
            email: 'gregory@stuart.tm',
            bool: false,
        }, {
            index: 3,
            index_start_at: 58,
            integer: 8,
            float: 18.629,
            name: 'Tony',
            surname: 'Lowe',
            fullname: 'Marianne Godwin',
            email: 'charles@wilkerson.vn',
            bool: true,
        },
    ];
}
