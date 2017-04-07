angular.module('ufcApp')
  .directive('carousel', ['$timeout', function($timeout) {
  	return {
  		restrict: 'E',
  		transclude: true,
  		templateUrl: 'home/carousel.html',
  		scope: {
  			carouselUnits: '='
  		},
  		link: function($scope,  $element, $attr) {
  			$scope.carouselUnits.forEach(function(unit, index) {

  				if (!unit.thumbnail) {
  					$scope.carouselUnits.splice(index, 1);
  				}
  			});
  			$timeout(function() {
  				$('.carousel').slick({
		// lazyLoad: 'ondemand',
		infinite: true,
		autoplay: false,
		autoplaySpeed: 2000,
  			})
	}); 
  		}

  	}
  }])