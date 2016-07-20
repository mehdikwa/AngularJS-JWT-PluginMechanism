describe('extension', function () {
    describe('widget', function () {
        beforeEach(function () {
            browser.driver.manage().window().setSize(1280, 1024);
        });

        it('should have an input', function () {
            browser.get('/#/');

            $('nav li:nth-child(2) a').click().then(function () {
                element(by.model('vm.title')).clear().sendKeys('foo');

                expect($('h1').getText()).toEqual('Je m\'appelle foo');
            });
        });
    });
});
