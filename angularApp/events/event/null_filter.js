angular.module('ufcApp')
  .filter('null_measurement_filter', [function() {
  	return function(value) {
  		if (value) {
  			return value + '"';
  		} else {
  			return 'Unknown';
  		}
  	}
  }]);