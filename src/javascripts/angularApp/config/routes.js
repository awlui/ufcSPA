angular.module('ufcApp')
  .config(['$routeProvider', function($routeProvider) {
  	//Homepage
  	$routeProvider.when('/', {
  		templateUrl: "src/templates/home.html",
  	});
  	//Fighters Page
  	$routeProvider.when('/Fighters', {
  		templateUrl: "src/templates/fighterList.html",
  		controller: ['$location', 'fighterList', 'fighterSearchService', function($location, fighterList, fighterSearchService) {
        var self = this;
        self.options = function() {
          var flag = false;
          $('optgroup').css('display', 'none');
          for (key in self.weightClass) {
            if (self.weightClass[key] === true) {
              $('optgroup[label="' + key + '"]').css('display', 'block');
              flag = true;
            } else {
              $('optgroup[label="' + key + '"]').css('display', 'none');
            }
          }
          if (flag === false) {
            $('optgroup').css('display', 'block');
          }
        }
  			self.fighterList = fighterList.data;

        self.fighterSearch = function() {
          $location.url('Fighters/' + self.currentFighterID)

        }

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
      templateUrl: "src/templates/fighterList.html",
      controller: ['$location', 'fighter', 'fighterList', '$routeParams', 'searchOptionsState', function($location, fighter, fighterList, $routeParams, searchOptionsState) {
        var self = this;
        self.currentFighterID = parseInt($routeParams.fighterID);
        self.weightClass = searchOptionsState.weightClass;
        self.options = function() {
          console.log($('optgroup'))
          var flag = false;
          $('optgroup').css('display', 'none');
          for (key in self.weightClass) {
            if (self.weightClass[key] === true) {
              $('optgroup[label="' + key + '"]').css('display', 'block');
              flag = true;
            } else {
              $('optgroup[label="' + key + '"]').css('display', 'none');
            }
          }
          if (flag === false) {
            $('optgroup').css('display', 'block');
          }
          searchOptionsState.weightclass = self.weightClass
        }
        self.fighterList = fighterList.data;
        self.currentFighter = fighter.data;
        self.fighterSearch = function() {
            if (self.currentFighterID) {
              $location.path('Fighters/' + self.currentFighterID)
            } else {
              $location.path('Fighters')
            }
        }
        self.options();
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