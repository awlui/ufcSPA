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
          return $http.get('https://localhost:3000/api/news')
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
  				return $http.get('https://localhost:3000/api/fighters')
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
          return $http.get('https://localhost:3000/api/fighters');
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
          return $http.get('https://localhost:3000/api/events');
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
          return $http.get('https://localhost:3000/api/events/' + $route.current.params.eventId);
        }],
        fightList: ['$http', '$route', function($http, $route) {
          return $http.get('https://localhost:3000/api/events/' + $route.current.params.eventId + '/fights');
        }]
      }
    });

    $routeProvider.otherwise({
      templateUrl: '404/404.html'
    });
  }])