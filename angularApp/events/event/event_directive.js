angular.module('ufcApp')
  .directive('eventDirective', [function() {
  	return {
  		templateUrl: "events/event/event.html",
  		restrict: "A",
  		scope: {
  			eventInfo: "=",
        fightList: "=",
        pastEvent: "="
  		},
  		link: function($scope, $element, $attr) {
        $scope.selected = false;
        $scope.toggle = function() {
          $scope.selected = $scope.selected ? false : true;
        };
  		}
  	}
  }]);