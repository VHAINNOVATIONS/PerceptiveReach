Feature: As a SPC I  want to view newly identified at-risk Veterans during a specific time frame-PR-352
#At-Risk Feature

Scenario: I open a web browser and see the SPC navigation page
Given I navigate to the http://localhost:7003/
Then I should see the navigation menu
When I click on  "State Facility View - OH"
Then I should see at risk veterans for the state facility OHIO
And I click on specific time frame
Then I should see the at-risk veterans for the specific time frame
And  I select the previous month 
Then I should see the at-risk veterans for the previous months