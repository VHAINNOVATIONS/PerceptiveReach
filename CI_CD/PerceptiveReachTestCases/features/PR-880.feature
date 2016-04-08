Feature: As a Dashboard User, I want to see a line graph that shows the change in suicide rate over time. PR-880 1.1.15

Scenario: PR-880
Given I navigate to the http://localhost:7003/
Then I should see "Perceptive Reach"
Then I put in "email" field as "vaphsfequia"
Then I put in "password" field as "FeAn#011819"
And I click on check box "checky"
And I click on "Login" button
When I click on "Add a Widget" button
And I add the "Suicide Rate" widget
And I click "save changes" button
Then I should see "Suicide Rate" widget
And I click on "Logout" button