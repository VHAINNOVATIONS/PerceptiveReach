Feature: As a Veteran I want to find a nearby hospital by using http://www.va.gov/bluebutton/
 
Scenario: I open a web browser and use http://www.va.gov/bluebutton/ to find a nearby hospital
	Given I am on http://www.va.gov/bluebutton/
	When I enter my zip code
	Then I should see a nearby hospitals