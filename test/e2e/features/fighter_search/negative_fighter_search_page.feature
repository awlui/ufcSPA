Feature: Users can't find a fighter on the Fighter Search Page with invalid options

	Scenario: By checking the wrong weight class for a fighter
		Given I go to "localhost:3000/#!/Fighters"
		And I click on the "Flyweight" checkbox
		Then I should not see "Cain Velasquez" on the list