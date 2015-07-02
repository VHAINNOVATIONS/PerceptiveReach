Feature: As any IRDS user, I want to be automatically logged out of the application after 15 minutes of inactivity PR-2084 1.1.72

Scenario: I open a web browser and navigate to http://localhost:7003/ to see the inactivity logout 
Given I navigate to the http://localhost:7003/
Then I should see "Perceptive Reach"
When I put in "email" field as "vaphsfequia"
And I put in "password" field as "FeAn#011819"
And I click on check box "checky"
And I click on "Login" button
And I should see "Individual View"
When I leave the page inactive for 908 seconds
Then I should see "You're Idle. Do Something! You'll be logged out"