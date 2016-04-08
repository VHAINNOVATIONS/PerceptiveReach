Feature: As a Dashboard User, I want to move screen elements I see on the Dashboard so I can customize the look of the Dashboard to suit my preferences. PR-357 1.1.8
Scenario: 
Given I navigate to the http://localhost:7003/
Then I should see "Perceptive Reach"
Then I put in "email" field as "vaphsfequia"
Then I put in "password" field as "FeAn#011819"
And I click on check box "checky"
And I click on "Login" button
When I click on "Individual View"
And I should see "Emergency Contact Information" widget
Then I drag the "Emergency Contact Information" widget to the top left of the screen
And I click on "Logout" button
