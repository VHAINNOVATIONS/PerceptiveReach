Feature: Navigate the prototype dashboard


Scenario: I open a web browser and see the prototype dashboard and click the navigation tabs

Given I navigate to the "http://localhost:9001/client/index.html"		
When the webpage loads 
Then I see the widgets in the National View
And I click the State View
	Then I see the State View
And I click the Facility View
	Then I see the Facility View
And I click the Individual View
	Then I see the Individual View