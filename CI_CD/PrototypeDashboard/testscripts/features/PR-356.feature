Feature: As a Dashboard User, I want to pick and choose which screen elements I see on the Dashboard, so I can first see only the data that is important to me. PR-356

Scenario: PR-356
Given I navigate to the http://localhost:7003/
When I click on "Individual View"
Then I click on "Add a Widget" button
And I add the "time" widget
And I click "save changes" button
Then I should see "time" widget