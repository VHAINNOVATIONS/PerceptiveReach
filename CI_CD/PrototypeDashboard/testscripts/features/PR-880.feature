Feature: As a Dashboard User, I want to see a line graph that shows the change in suicide rate over time. PR-880
Given I navigate to the http://localhost:7003/
Then I click on "Add a Widget" button
Then I add the "Suicide Rate" widget
Then I click "save changes" button
And I should see "Suicide Rate" widget