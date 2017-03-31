  // File: chapter14/protractor.conf.js
exports.config = {
// The address of a running Selenium server seleniumAddress: 'http://localhost:4444/wd/hub',
      // The URL where the server we are testing is running
      baseUrl: 'http://localhost:3000',
  getPageTimeout: 60000,
  allScriptsTimeout: 500000,
      // Capabilities to be passed to the WebDriver instance
      capabilities: {
        'browserName': 'chrome'
},
// Spec patterns are relative to the location of the // spec file. They may include glob patterns. specs: ['*Spec*.js'],
      // Options to be passed to Jasmine-node
      framework: 'custom',
      frameworkPath: require.resolve('protractor-cucumber-framework'),
      specs: [
      	'test/e2e/features/*.feature'
      ],
      cucumberOpts: {
      	require: 'test/e2e/features/step_definitions/*.js',
      	tags: false,
      	format: 'pretty',
        profile: false,
        'no-source': true
      },
      onPrepare: function() {
      	browser.driver.manage().window().setSize(1200, 1200);
      }
};