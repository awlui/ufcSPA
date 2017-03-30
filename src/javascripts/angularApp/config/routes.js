angular.module('ufcApp')
  .config(['$routeProvider', function($routeProvider) {
  	//Homepage
  	$routeProvider.when('/', {
  		templateUrl: "src/templates/home.html",
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
    })
  }])