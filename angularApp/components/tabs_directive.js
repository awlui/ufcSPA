angular.module('ufcApp')
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