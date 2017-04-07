Feature: Users can view UFC past and future events

	Scenario: By Clicking on the events link, the user is taken to the events page
		Given I go to "localhost:3000"
		When I click Events in the navbar
		Then I should be taken to the Events page
	
