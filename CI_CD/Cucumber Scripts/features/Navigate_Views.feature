Feature: Navigate Views of Dashboard

@NavigateViewsPR-1191
Scenario: I open a web browser and see the prototype dashboard and click the navigation tabs

Given I navigate to the "http://localhost:7003"		
When the webpage loads 
Then I see the National View
And I click the National View
	Then I see the State View
And I click the State View
	Then I see the Facility View
And I click the Facility View
	Then I see the Individual View
And I click the Individual View