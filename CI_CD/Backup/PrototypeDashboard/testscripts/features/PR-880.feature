Feature: As a Dashboard User, I want to see a line graph that shows the change in suicide rate over time. PR-880

Scenario: PR-880
Given I navigate to the http://localhost:7003/
When I click on "Add a Widget" button
And I add the "Suicide Rate" widget
And I click "save changes" button
Then I should see "Suicide Rate" widget