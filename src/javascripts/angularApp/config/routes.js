angular.module('ufcApp')
  .config(['$routeProvider', function($routeProvider) {
  	//Homepage
  	$routeProvider.when('/', {
  		templateUrl: "src/templates/home.html",
  	});
  	//Fighters Page
  	$routeProvider.when('/Fighters', {
  		templateUrl: "src/templates/fighterList.html",
  		controller: ['fighterList', function(fighterList) {
        this.options = {
          weight_class: 'Featherweight'
        };
  			this.fighterList = fighterList.data;

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
    }])