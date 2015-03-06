Feature: As a Dashboard User, I want to pick and choose which screen elements I see on the Dashboard, so I can first see only the data that is important to me. PR-356

Scenario: 
Given I navigate to the http://localhost:7003/
When I click on Individual Veteran View
Then I should see a drop down list with widget names
The I select the widgets I want to see on my customized dashboard
Then I click Save
And I should see the widgets I selected appear on my customized dashboard