angular.module('ufcApp')
  .config(['$routeProvider', function($routeProvider) {
  	//Homepage
  	$routeProvider.when('/', {
  		templateUrl: "src/templates/home.html",
  	});
  	//Fighters Page
  	$routeProvider.when('/Fighters', {
  		templateUrl: "src/templates/fighterList.html",
  		controller: ['fighterList', 'fighterSearchService', function(fighterList, fighterSearchService) {
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
          fighterSearchService.query(self.currentFighterID).then(function(data) {
            self.currentFighter = data.data;
          });

        }

  		}],
      controllerAs: 'mainCtrl',
  		resolve: {
  			fighterList: ['$http',function($http) {
  				return $http.get('http://localhost:3000/api/fighters')
  			}
        ]
  		}
  	});
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
  .factory('fighterSearchService', ['$http', function($http) {
    return {
      query: function(id) {
        return $http.get('http://localhost:3000/api/fighters/' + id);
      }
    }
  }]);