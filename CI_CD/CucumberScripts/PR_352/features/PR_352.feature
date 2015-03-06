Feature: As a SPC I  want to view newly identified at-risk Veterans during a specific time frame-PR_352
#At-Risk Feature

Scenario Outline: I open a web browser and see the SPC navigation page
Given I navigate to the http://localhost:7003/
Then I should see the navigation menu
And
	When I click on  "State Facility View - OH"
	Then I should see at risk veterans for the state facility OHIO
And When I click on specific time frame
Then I should see the at-risk veterans for the specific time frame
And When I select the previous month 
Then I should see the at-risk veterans for the previous months