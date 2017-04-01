Feature: Users can filter by weight class

	Scenario: To see fighters from weight classes
		Given I go to "localhost:3000/#!/Fighters"
		And I click on the "Bantamweight" checkbox
		When I click "Cody Garbrandt"
		Then I should be given "Cody Garbrandt"s information

	Scenario: To not see fighters from weight classes
		Given I go to "localhost:3000/#!/Fighters"
		And I click on the "Flyweight" checkbox
		Then I should not see "Cain Velasquez" on the list

