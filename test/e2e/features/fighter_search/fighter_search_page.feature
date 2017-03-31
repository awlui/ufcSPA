Feature: Users can view the Fighter Search Page
	
	Scenario: By clicking on the Fighters Link
		Given I go to "localhost:3000"
		When I click Fighters in the navbar
		Then I should be taken to the Fighters Search page