angular.module('ufcApp')
  .factory('eventsDateService', [function() {
  	//The split function splits an event list between upcoming{upcomingDates} and past dates{pastDates}; pagifying ability added to create 2d arrays
		var split = function(events, perPage) {
		var currentDate = Date.now(),
			eventIndex;
		for (eventIndex=0;eventIndex < events.length; eventIndex++) {
			var possibleUpcomingDate = new Date(events[eventIndex].event_date);
			var timeDifference = possibleUpcomingDate - currentDate;
			var oneDay = 24*60*60*1000;
			var upcomingDates, pastDates;
			var pagifyUpcomingDates =[], pagifyPastDates=[];
			if ((timeDifference < 0)) {
				if ((-timeDifference < oneDay)) {
					upcomingDates = events.splice(0, eventIndex+1);
					pastDates = events;
				} else {
					upcomingDates = events.splice(0, eventIndex);
					pastDates = events;
				}
				while (upcomingDates.length > 0) {
					pagifyUpcomingDates.push(upcomingDates.reverse().splice(0,perPage));
				}
				while(pastDates.length > 0) {
					pagifyPastDates.push(pastDates.splice(0,perPage));
				}
				return {
					upcomingDates: pagifyUpcomingDates,
					pastDates: pagifyPastDates.splice(0,10)
				}
			}
		}
	};
  	return {
  		split: split
  	}
  }]);