'use strict'
angular.module('ufcApp', ['ngRoute']);
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
                '<div ng-transclude></div>',
      controller: function($scope) {
        var currentIndex = 0;
        $scope.tabs = [];
        this.registerTab = function(title, scope) {
          if ($scope.tabs.length === 0) {
            scope.selected = true;
          } else {
            scope.selected = false;
          }
          $scope.tabs.push({title: title, scope: scope});
        };
        $scope.selectTab = function(index) {
          currentIndex = index;
          for (var i = 0; i < $scope.tabs.length; i++) {
            $scope.tabs[i].scope.selected = currentIndex === i;
          }
        };
        $scope.isSelectedTab = function(index) {
          return currentIndex === index;
        };
      }
    };
  }])
angular.module('ufcApp')
  .config(['$routeProvider', function($routeProvider) {
  	//Homepage
  	$routeProvider.when('/', {
  		templateUrl: "home/home.html",
      controller: ['articleList',function(articleList) {
        var self = this;
        self.articles = articleList.data.splice(1,5);

      }],
      controllerAs: 'mainCtrl',
      resolve: {
        articleList: ['$http', function($http) {
          return $http.get('http://localhost:3000/api/news')
        }]
      }
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
          return $http.get('http://localhost:3000/api/fighters');
        }],
        fighter: ['fighterSearchService', '$route', '$location', '$q', function(fighterSearchService, $route, $location, $q) {
          return fighterSearchService.query(parseInt($route.current.params.fighterID)).then(function(data) {
            return data;
          }).catch(function(err) {
            $location.path('/Fighters');
            $location.replace();
            return $q.reject(err);
          })
        }]
      }
    });

    $routeProvider.when('/Events', {
      templateUrl: 'events/events.html',
      controller: ['eventList', 'eventsDateService', function(eventList, eventsDateService) {
        var self = this;
        //I will reduce the eventList at this point in time; Need more features to handle large amount of Events
        var eventList = eventList.data;
        self.eventSplit = eventsDateService.split(eventList, 10);

      }],
      controllerAs: 'mainCtrl',
      resolve: {
        eventList: ['$http', function($http) {
          return $http.get('http://localhost:3000/api/events');
        }]
      }
    });

    $routeProvider.when('/Events/:eventId', {
      template: '<div event-directive event-info="mainCtrl.eventInfo" fight-list="mainCtrl.fightList"></div>',
      controller: ['eventInfo', 'fightList', function(eventInfo, fightList) {
        var self = this;
        self.eventInfo = eventInfo.data;
        self.fightList = fightList.data;
      }],
      controllerAs: 'mainCtrl',
      resolve: {
        eventInfo: ['$http', '$route', function($http, $route) {
          return $http.get('http://localhost:3000/api/events/' + $route.current.params.eventId);
        }],
        fightList: ['$http', '$route', function($http, $route) {
          return $http.get('http://localhost:3000/api/events/' + $route.current.params.eventId + '/fights');
        }]
      }
    });

    $routeProvider.otherwise({
      templateUrl: '404/404.html'
    });
  }])
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
angular.module('ufcApp')
	.filter('event_result_filter', [function() {
		return function(drawCheck, result, winner) {
			var resultString = "";
			if (!drawCheck) {
				return 'DRAW'
			}
			if (~result.Method.indexOf('Decision')) {
				resultString += result.Method;
			} else {
				resultString += result.Method + " in round " + result.EndingRound + " / " + result.EndingTime;
			}
			if (winner) {
				return "Winner by " + resultString;
			} else {
				return "";
			}
		}
	}]);
angular.module('ufcApp')
  .filter('null_measurement_filter', [function() {
  	return function(value) {
  		if (value) {
  			return value + '"';
  		} else {
  			return 'Unknown';
  		}
  	}
  }]);
angular.module('ufcApp')
  .factory('eventsDateService', [function() {
  	//The split function splits an event list between upcoming{upcomingDates} and past dates{pastDates}; pagifying ability added to create 2d arrays
		var split = function(events, perPage) {
		var currentDate = Date.now(),
			eventIndex;
		for (eventIndex=0;eventIndex < events.length; eventIndex++) {
			var possibleUpcomingDate = new Date(events[eventIndex].event_date);
			var timeDifference = possibleUpcomingDate - currentDate;
			var oneDay = 24*60*60*1000;
			var upcomingDates, pastDates;
			var pagifyUpcomingDates =[], pagifyPastDates=[];
			if ((timeDifference < 0)) {
				if ((-timeDifference < oneDay)) {
					upcomingDates = events.splice(0, eventIndex+1);
					pastDates = events;
				} else {
					upcomingDates = events.splice(0, eventIndex);
					pastDates = events;
				}
				while (upcomingDates.length > 0) {
					pagifyUpcomingDates.push(upcomingDates.reverse().splice(0,perPage));
				}
				while(pastDates.length > 0) {
					pagifyPastDates.push(pastDates.splice(0,perPage));
				}
				return {
					upcomingDates: pagifyUpcomingDates,
					pastDates: pagifyPastDates.splice(0,10)
				}
			}
		}
	};
  	return {
  		split: split
  	}
  }]);
// $(function() {
// 	$('button').on('click', function() {
// 	$('.carousel').slick({
// 		// lazyLoad: 'ondemand',
// 		infinite: true,
// 		autoplay: true,
// 		autoplaySpeed: 2000,

// 	}); 
// 	})
// });
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