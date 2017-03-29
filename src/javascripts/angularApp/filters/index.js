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
  .filter('weightClassFilter', [function() {
    return function(fighterList, weightClasses) {
      var array = [];
      var flag = false;
      if (Object.keys(weightClasses).length > 0) {
        for (key in weightClasses) {
          if (weightClasses[key]) {
            flag = true;
          }
        }
      }
      if (flag) {
        angular.forEach(fighterList, function(fighter) {
          if (weightClasses[fighter.weight_class]) {
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