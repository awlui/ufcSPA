angular.module('ufcApp')
  .config(['$routeProvider', function($routeProvider) {
  	$routeProvider.when('/', {
  		templateUrl: "src/javascripts/angularApp/templates/home.html",
  	})
  }]);