exports.config = {
    specs: [
        'src/test/e2e/**/*.js',
    ],
    onPrepare: function() {
        // le reporter des résultats de tests
        var jasmineReporters = require('jasmine-reporters');
        // returning the promise makes protractor wait for the reporter config before executing tests
        return browser.getProcessedConfig().then(function(config) {
            // you could use other properties here if you want, such as platform and version
            var browserName = config.capabilities.browserName;

            var junitReporter = new jasmineReporters.JUnitXmlReporter({
                consolidateAll: true,
                savePath: 'test-results/protractor',
                filePrefix: browserName + '-tests',
                modifySuiteName: function(generatedSuiteName, suite) {
                    // this will produce distinct suite names for each capability,
                    // e.g. 'firefox.login tests' and 'chrome.login tests'
                    return browserName + '.' + generatedSuiteName;
                }
            });
            jasmine.getEnv().addReporter(junitReporter);
        });
    },
    capabilities: {
        browserName: 'chrome',
        // 'phantomjs.binary.path': require('phantomjs-prebuilt').path,
        // 'phantomjs.ghostdriver.cli.args': ['--loglevel=DEBUG'],
    },
    rootElement: 'body',
    framework: 'jasmine2',
};
