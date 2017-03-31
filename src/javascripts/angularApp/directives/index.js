angular.module('ufcApp')
  .directive('searchOptions', ['$location', 'searchOptionsState', function($location, searchOptionsState) {
  	return {
  		templateUrl: "src/templates/fighterList.html",
  		restrict: "A",
  		scope: {
  			weightClass: '=',
  			fighterList: '=',
  			currentFighter: '=',
  		},
  		link: function($scope, $element, $attr) {
  		$scope.query = "";
        $scope.fighterSearch = function() {
            if ($scope.currentFighter.id) {
              $location.path('Fighters/' + parseInt($scope.currentFighter.id, 10))
            } else {
              $location.path('Fighters')
            }
        }
  		}
  	}
  }])

  .directive('routeLoadingIndicator', ['$rootScope', function($rootScope) {
    return {
      restrict: 'E',
      transclude: true,
      template: "<div ng-class='loading' ng-if='isRouteLoading' ng-transclude></div>",
      link: function(scope, elem, attrs) {
        scope.isRouteLoading = false;
        $rootScope.$on('$routeChangeStart', function() {
          scope.isRouteLoading = true;
        });

        $rootScope.$on('$routeChangeSuccess', function() {
          scope.isRouteLoading = false;
        });
      }
    }
  }])

  .directive('tabs', [function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: true,
      template: '<div class="tab-headers">' +
                '<div ng-repeat="tab in tabs" ' +
                'ng-click="selectTab($index)" ' +
                'ng-class="{selected: isSelectedTab($index)}">' +
                '<span ng-bind="tab.title"></span>' +
                '</div>' + 
                '</div>' +
                '<div ng-transclude></div>'
    }
  }])