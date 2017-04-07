angular.module('ufcApp')
  .directive('eventDirective', [function() {
  	return {
  		templateUrl: "events/event/event.html",
  		restrict: "A",
  		scope: {
  			eventInfo: "=",
        fightList: "="
  		},
  		link: function($scope, $element, $attr) {

  		}
  	}
  }]);