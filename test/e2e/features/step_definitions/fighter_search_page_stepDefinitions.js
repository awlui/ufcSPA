var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

var expect = chai.expect;

module.exports = function() {
       this.When(/^I click Fighters in the navbar$/, function () {
         // Write code here that turns the phrase above into concrete actions
         element(by.css('aside a[href="#!/Fighters"]')).click();
       });
       this.Then(/^I should be taken to the Fighters Search page$/, function (callback) {
		browser.getCurrentUrl().then(function(url) {
			expect(url).to.equal('http://localhost:3000/#!/Fighters');
		}).then(function() {
		return element(by.css('.fighterSearch h1')).getText()
		}).then(function(text) {
			expect(text).to.equal('Fighter Search')
			callback();
		})

       });
}