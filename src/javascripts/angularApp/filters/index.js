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

  .filter('weightClassFilter', [function() {
    return function(fighterList, weightClasses) {
      var array = [];
      var flag = false;
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
  }])

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
  }])

  .filter('outcomeTransformer', [function() {
    return function(outcome) {
      if (outcome === null) {
        return "Upcoming";
      } else {
        return outcome;
      }
    }
  }])

  .filter('locationTransformer', [function() {
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

  .filter('missingImageFilter', [function() {
    return function(fight) {
      if (!!fight.Opponent.profile_image) {
        return fight.Opponent.profile_image
      } else {
        console.log(fight.WeightClass.Description)
        if (~fight.WeightClass.Description.indexOf('Women')) {
          return "http://imagec.ufc.com/http%253A%252F%252Fmedia.ufc.tv%252F%252Ffighter_images%252FShadow%252FUFCWomen_Headshot.png?w600-h600-tc1";
        } else {
          return "http://imagec.ufc.com/http%253A%252F%252Fmedia.ufc.tv%252F%252Ffighter_images%252F%252FComingSoon%252Fcomingsoon_headshot_odopod.png?w600-h600-tc1";
        }
      }
    }
  }])
