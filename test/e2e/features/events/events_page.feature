Feature: Users can view the events page

	Scenario: By Clicking on the events link
		Given I go to "localhost:3000"
		When I click Events in the navbar
		Then I should be taken to the Events page
