Feature: As a Dashboard User, I want to move screen elements I see on the Dashboard so I can customize the look of the Dashboard to suit my preferences. PR-357
Scenario: 
Given I navigate to the http://localhost:7003/
When I click on Individual Veteran View
Then I should see my default widgets
Then I click on the top bar of widget 1
Then I drag the Widget to the left of the screen
And I should see the Widget placed on the left of the screen