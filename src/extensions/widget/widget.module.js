(function () {
    'use strict';

    angular
        .module('extensions.widget', [])
        .controller('WidgetsController', WidgetsController);

    function WidgetsController() {
        const vm = this;

        vm.title = 'WidgetsController';
    }
})();
