'use strict'
angular.module('ufcApp', ['ngRoute']);
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
angular.module('ufcApp')
  .config(['$routeProvider', function($routeProvider) {
  	//Homepage
  	$routeProvider.when('/', {
  		templateUrl: "home/home.html",
  	});
  	//Fighters Page
  	$routeProvider.when('/Fighters', {
  		template: "<div search-options weight-class='mainCtrl.weightClass' fighter-list='mainCtrl.fighterList'current-fighter='mainCtrl.currentFighter'></div>",
  		controller: ['$location', 'fighterList', 'searchOptionsState', function($location, fighterList, searchOptionsState) {
        var self = this;
  			self.fighterList = fighterList.data;
        self.weightClass = searchOptionsState.weightClass;
        self.currentFighter = {};


  		}],
      controllerAs: 'mainCtrl',
  		resolve: {
  			fighterList: ['$http', function($http) {
  				return $http.get('http://localhost:3000/api/fighters')
  			}
        ]
  		}
  	});
    $routeProvider.when('/Fighters/:fighterID', {
      template: "<div search-options weight-class='mainCtrl.weightClass' fighter-list='mainCtrl.fighterList' current-fighter='mainCtrl.currentFighter'></div>",
      controller: ['$location', 'fighter', 'fighterList', '$routeParams', 'searchOptionsState', function($location, fighter, fighterList, $routeParams, searchOptionsState) {
        var self = this;
        self.currentFighterID = parseInt($routeParams.fighterID);
        self.weightClass = searchOptionsState.weightClass;
        
        self.fighterList = fighterList.data;
        self.currentFighter = fighter.data;

      }],
      controllerAs: 'mainCtrl',
      resolve: {
        fighterList: ['$http', function($http) {
          return $http.get('http://localhost:3000/api/fighters')
        }],
        fighter: ['fighterSearchService', '$route', function(fighterSearchService, $route) {
          return fighterSearchService.query(parseInt($route.current.params.fighterID)).then(function(data) {
            return data;
          }).catch(function(err) {
            console.log(err)
            return;
          })
        }]
      }
    });

    $routeProvider.when('/Events', {
      templateUrl: 'events/events.html'
    })
  }])
angular.module('ufcApp')
  .filter('locationFilter', [function() {
    return function(arr) {
      var str = ""
      if (arr[0]) {
        str += arr[0] + ', '
      }
      if (arr[1]) {
        str += arr[1] + ' ';
      }
      if (arr[2]) {
        str += arr[2];
      }

      return str ? str : "Unknown"; 
    }
  }])
angular.module('ufcApp')
  .filter('missingImageFilter', [function() {
    return function(fight) {
      if (!!fight.Opponent.profile_image) {
        return fight.Opponent.profile_image
      } else {
        if (~fight.WeightClass.Description.indexOf('Women')) {
          return "http://imagec.ufc.com/http%253A%252F%252Fmedia.ufc.tv%252F%252Ffighter_images%252FShadow%252FUFCWomen_Headshot.png?w600-h600-tc1";
        } else {
          return "http://imagec.ufc.com/http%253A%252F%252Fmedia.ufc.tv%252F%252Ffighter_images%252F%252FComingSoon%252Fcomingsoon_headshot_odopod.png?w600-h600-tc1";
        }
      }
    }
  }])
angular.module('ufcApp')
  .filter('nameFilter', [function() {
    return function(fighterList, query) {
      var array = [];
      angular.forEach(fighterList, function(fighter) {
        var fullName = fighter.first_name + " " + fighter.last_name;
        var regexp = new RegExp(query, 'i');
        if (regexp.test(fullName)) {
          array.push(fighter)
        }
      });
      return array;
    }
  }]);
angular.module('ufcApp')
  .filter('nullWeightClass', [function() {
    return function(fighterList) {
      var array = [];
      angular.forEach(fighterList, function(fighter) {
        if (fighter.weight_class !== null) {
          array.push(fighter);
        }
      });
      return array;
    }
  }]);
angular.module('ufcApp')
  .filter('outcomeFilter', [function() {
    return function(outcome) {
      if (outcome === null) {
        return "Upcoming";
      } else {
        return outcome;
      }
    }
  }]);
angular.module('ufcApp')
  .directive('searchOptions', ['$location', 'searchOptionsState', function($location, searchOptionsState) {
  	return {
  		templateUrl: "search_fighter/fighterList.html",
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
  }]);
angular.module('ufcApp')
  .factory('fighterSearchService', ['$http', function($http) {
    return {
      query: function(id) {
        return $http.get('http://localhost:3000/api/fighters/' + id);
      }
    }
  }]);
angular.module('ufcApp')
  .factory('searchOptionsState', [function() {
  	return {
  		weightClass: {}
  	}
  }]);

  
angular.module('ufcApp')
  .filter('weightClassFilter', [function() {
    return function(fighterList, weightClasses) {
      var array = [],
        flag = false,
        key;

      if (Object.keys(weightClasses).length > 0) {
        for (key in weightClasses) {
          if (!!weightClasses[key]) {
            flag = true;
          }
        }
      }
      if (flag) {
        angular.forEach(fighterList, function(fighter) {
          if (!!weightClasses[fighter.weight_class]) {
            array.push(fighter)
            flag = true;
          } else {
            return false;
          }
        })
      } else {
        return fighterList;
      }
      return array;
    }
  }]);