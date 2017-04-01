angular.module('ufcApp')
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