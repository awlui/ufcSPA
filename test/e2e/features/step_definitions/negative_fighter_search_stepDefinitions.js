var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

var expect = chai.expect;

module.exports = function() {
       this.Then(/^I should not see "([^"]*)" on the list$/, function (name, callback) {
       	$('option[label="Cain Velasquez"]').isPresent().then(function(bool) {
       		expect(bool).to.be.false;
       		callback();
       	});
       });
};

