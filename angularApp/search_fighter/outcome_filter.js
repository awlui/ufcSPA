angular.module('ufcApp')
  .filter('outcomeFilter', [function() {
    return function(outcome) {
      if (outcome === null) {
        return "Upcoming";
      } else {
        return outcome;
      }
    }
  }]);