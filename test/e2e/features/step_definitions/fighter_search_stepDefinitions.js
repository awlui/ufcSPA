var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

var expect = chai.expect;

module.exports = function() {
       this.Given(/^I scroll down the scrollbox to Conor Mcgregor$/, function () {
       	var el = element(by.css('option[label="Conor McGregor"]'));
       	browser.executeScript('arguments[0].scrollIntoView(true)', el.getWebElement());
       });
       this.Given(/^I click on the "([^"]*)" checkbox$/, function (weightclass) {
       	weightclass = weightclass.toLowerCase();
       	var el = $('input#' + weightclass);
        el.click();
       });
       this.When(/^I click "([^"]*)"$/, function (name) {
         $('option[label="' + name + '"]').click();
       });
       this.Then(/^I should be given "([^"]*)"s information$/, function (name, callback) {
    	element(by.css('.fighterProfile h2')).getText()
		.then(function(text) {
			expect(text).to.equal(name)
			callback();
		});
       });
}