'use strict';

/* eslint-disable no-var */
describe('core', function () {
    describe('route', function () {
        var $httpBackend;

        beforeEach(module(function ($provide) {
            $provide.constant('MODULES', {});
        }));
        beforeEach(module('app'));
        beforeEach(module('app.core'));

        beforeEach(inject(function ($injector) {
            $httpBackend = $injector.get('$httpBackend');

            $httpBackend.when('GET', 'content/locales/en.json').respond({});
            $httpBackend.when('GET', 'content/locales/fr.json').respond({});

            $httpBackend.when('GET', 'app/user/login.html').respond({});
        }));

        it('should map /login route to login View template', inject(function ($location, $rootScope, $state) {
            $httpBackend.expectGET('/');
            $httpBackend.expectGET('app/user/login.html');
            var state = $state.get('login');
            $rootScope.$apply();

            expect(state.templateUrl).toBe('app/user/login.html');
        }));
    });
});
/* eslint-enable no-var */
