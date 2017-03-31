var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

var expect = chai.expect;

module.exports = function() {
	this.Given(/^I go to "([^"]*)"$/, function (site) {
		browser.get('http://'+site);
		});
	this.When(/^I click Events in the navbar$/, function () {
		element(by.css('aside a[href="#!/Events"]')).click();
		});
	this.Then(/^I should be taken to the Events page$/, function (callback) {
		browser.getCurrentUrl().then(function(url) {
			expect(url).to.equal('http://localhost:3000/#!/Events');
		}).then(function() {
		element(by.css('h2.Events')).getText()
		.then(function(text) {
			expect(text).to.equal('Upcoming Events')
			callback();
		})
		});
		});
}