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
  }])