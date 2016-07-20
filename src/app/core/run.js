'use strict';

/**
 * App core runtime function
 * @memberOf App.Core
 */

/**
 * @name run
 * @desc Runtime function of app.core module
 * @param {Object} $rootScope The angular $rootScope
 * @param {Object} $state Ui-router module
 * @param {Object} $window The angular $window
 * @param {Object} store Cookie module
 * @memberOf App.Core
 * @returns {void}
 */
/* eslint-disable no-unused-vars */
export /* @ngInject */ function run($rootScope, $state, $window, store) {
    /* eslint-enable no-unused-vars */

    $rootScope.$on('$stateChangeStart', function (event, toState) {
        const state = toState.name.split('.');
        let tmpState;

        for (let i = 1; i <= state.length; i++) {
            tmpState = state.slice(0, i).join('.');

            if ($state.get(tmpState)) {
                if ($state.get(tmpState).protected && !store.get('user.token')) {
                    event.preventDefault();
                    $state.go('login');
                }

                if (toState.name === 'logout') {
                    event.preventDefault();

                    store.remove('user.token');
                    delete $rootScope.currentUser;

                    $state.go('login');
                }
            }
        }
    });

    $rootScope.$on('$stateChangeSuccess', function () {
        $window.scrollTo(0, 0);
    });
}
