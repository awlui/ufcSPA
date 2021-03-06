angular.module('ufcApp')
  .directive('tab', [function() {
  	return {
  		restrict: 'E',
  		transclude: true,
  		template: '<div ng-show="selected" ng-transclude></div>',
  		require: '^tabs',
  		scope: true,
  		link: function($scope, $element, $attr, tabCtrl) {
  			tabCtrl.registerTab($attr.title, $scope);
  		}
  	}
  }])