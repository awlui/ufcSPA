angular.module('ufcApp')
	.filter('event_result_filter', [function() {
		return function(drawCheck, result, winner) {
			var resultString = "";
			if (!drawCheck) {
				return 'DRAW'
			}
			if (~result.Method.indexOf('Decision')) {
				resultString += result.Method;
			} else {
				resultString += result.Method + " in round " + result.EndingRound + " / " + result.EndingTime;
			}
			if (winner) {
				return "Winner by " + resultString;
			} else {
				return "";
			}
		}
	}]);