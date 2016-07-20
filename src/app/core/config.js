'use strict';

/**
 * App core config function
 * @memberOf App.Core
 */

/**
 * @name config
 * @desc Config function of app.core module
 * @param {Object} $httpProvider The angular $httpProvider
 * @param {Object} $urlRouterProvider url router provider
 * @param {Object} $stateProvider ui-router provider
 * @param {Object} $translateProvider translation provider
 * @param {Object} $mdThemingProvider angular-material provider
 * @param {Object} ssSideNavSectionsProvider angular-material side bar provider
 * @param {Object} RestangularProvider Restangular provider
 * @param {String} API_URL Base url coming from constants.json
 * @param {Object} MODULES List of injectable modules
 * @memberOf App.Core
 * @returns {void}
 */
export /* @ngInject */ function config($httpProvider, $urlRouterProvider, $stateProvider, $translateProvider, $mdThemingProvider, ssSideNavSectionsProvider, RestangularProvider, API_URL, MODULES) {
    const nav = [{
        id: 'nav',
        name: 'Mode déconnecté',
        type: 'heading',
        children: [{
            name: 'Mon compte',
            type: 'toggle',
            pages: [{
                id: 'dashboard',
                name: 'Modifier mon profil',
                state: 'dashboard',
            }],
        }],
    }, {
        id: 'admin',
        name: 'Administration',
        type: 'heading',
        children: [{
            id: 'dashboard',
            name: 'Accueil',
            state: 'dashboard',
            type: 'link',
        }, {
            id: 'login',
            name: 'Login',
            state: 'login',
            type: 'link',
        }, {
            id: 'WidgetCtrl',
            name: 'highchartWidgets',
            state: 'highchartWidgets',
            type: 'link',
        }],
    }];

    $httpProvider.interceptors.push('contentTypeSetterInterceptor');
    $httpProvider.interceptors.push('authHttpInterceptor');
    $httpProvider.defaults.headers.common = { 'Content-Type': 'application/json' };
    RestangularProvider.setBaseUrl(API_URL);
    $urlRouterProvider.otherwise('/login');

    $translateProvider.useStaticFilesLoader({
        prefix: 'content/locales/',
        suffix: '.json',
    });

    $translateProvider
        .registerAvailableLanguageKeys(['en', 'fr'], {
            'en_*': 'en',
            'fr_*': 'fr',
        })
        .determinePreferredLanguage();

    $stateProvider
        .state('dashboard', {
            url: '/',
            templateUrl: 'app/core/dashboard.html',
            protected: true,
        });

    _(MODULES).each((module) => {
        _(module.states).each((state) => {
            if (!state.abstract) {
                nav[1].children.push({
                    id: state.name,
                    name: module.label,
                    state: state.name,
                    type: 'link',
                });
            }

            $stateProvider
                .state(state.name, {
                    url: state.url,
                    abstract: state.abstract,
                    templateUrl: state.templateUrl,
                    controller: state.controller,
                    controllerAs: state.controllerAs,
                });
        });
    });

    $mdThemingProvider
        .theme('default')
        .primaryPalette('grey', { default: '700' })
        .accentPalette('green');

    ssSideNavSectionsProvider.initWithTheme($mdThemingProvider);
    ssSideNavSectionsProvider.initWithSections(nav);
}
