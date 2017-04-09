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
  // 				$('.carousel').slick({
		// // lazyLoad: 'ondemand',
		// infinite: true,
		// autoplay: true,
  //   speed: 1500,
		// autoplaySpeed: 2000,
  // 			})
   $('.carousel:nth-child(1)').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: true,
  dots: true,
  asNavFor: '.carousel:nth-child(2)'
});
$('.carousel:nth-child(2)').slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  asNavFor: '.carousel:nth-child(1)',
  centerMode: true,
  focusOnSelect: true,
  autoplay: true,
  speed: 1500,
  authoplaySpeed: 2000
});
  

	}); 
  		}

  	}
  }])