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