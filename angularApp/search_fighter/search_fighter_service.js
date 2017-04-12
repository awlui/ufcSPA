angular.module('ufcApp')
  .factory('fighterSearchService', ['$http', function($http) {
    return {
      query: function(id) {
        return $http.get('https://gentle-citadel-87711.herokuapp.com/api/fighters/' + id);
      }
    }
  }]);