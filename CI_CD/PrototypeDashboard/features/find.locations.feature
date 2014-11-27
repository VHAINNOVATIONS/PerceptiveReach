Feature: As a SPC I want to see the at risk veterans in Colorado using the Perceptive Reach Dashboard
 
Scenario: I open a web browser and use http://localhost:9000/ to see at risk veterans in Colorado
	Given I am on http://localhost:9000/
	When I click on Colorado
	Then I should see the "State Facility View - CO"