angular.module('ufcApp')
  .filter('missingImageFilter', [function() {
    return function(fight) {
      if (!!fight.Opponent.profile_image) {
        return fight.Opponent.profile_image
      } else {
        if (~fight.WeightClass.Description.indexOf('Women')) {
          return "http://imagec.ufc.com/http%253A%252F%252Fmedia.ufc.tv%252F%252Ffighter_images%252FShadow%252FUFCWomen_Headshot.png?w600-h600-tc1";
        } else {
          return "http://imagec.ufc.com/http%253A%252F%252Fmedia.ufc.tv%252F%252Ffighter_images%252F%252FComingSoon%252Fcomingsoon_headshot_odopod.png?w600-h600-tc1";
        }
      }
    }
  }])