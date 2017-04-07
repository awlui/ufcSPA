angular.module('ufcApp')
  .directive('carousel', [function() {
  	return {
  		restrict: 'E',
  		transclude: true,
  		template: '<div ng-transclude></div>',
  		scope: {
  			carouselUnits: '='
  		},
  		link: function($scope,  $element, $attr) {
  			
  		}

  	}
  }])