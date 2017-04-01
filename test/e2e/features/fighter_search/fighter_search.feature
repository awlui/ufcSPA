Feature: Users can find a fighter on the Fighter Search Page
	
	Scenario: By clicking on a fighter in the scrollbox without scrolling
		Given I go to "localhost:3000/#!/Fighters"
		When I click "Demetrious Johnson"
		Then I should be given "Demetrious Johnson"s information

	Scenario: By Clicking on a fighter in the scrollbox with scrolling
		Given I go to "localhost:3000/#!/Fighters"
		And I scroll down the scrollbox to Conor Mcgregor
		When I click "Conor McGregor" 
		Then I should be given "Conor McGregor"s information

	Scenario: By weight class by checking boxes
		Given I go to "localhost:3000/#!/Fighters"
		And I click on the "Bantamweight" checkbox
		When I click "Cody Garbrandt"
		Then I should be given "Cody Garbrandt"s information

