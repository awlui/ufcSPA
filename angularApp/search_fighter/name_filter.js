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