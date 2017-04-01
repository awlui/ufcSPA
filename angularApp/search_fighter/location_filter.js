angular.module('ufcApp')
  .filter('locationFilter', [function() {
    return function(arr) {
      var str = ""
      if (arr[0]) {
        str += arr[0] + ', '
      }
      if (arr[1]) {
        str += arr[1] + ' ';
      }
      if (arr[2]) {
        str += arr[2];
      }

      return str ? str : "Unknown"; 
    }
  }])