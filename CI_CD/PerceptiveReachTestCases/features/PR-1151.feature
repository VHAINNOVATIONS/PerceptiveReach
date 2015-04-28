Feature: As a Dashboard user, I want to search an at-risk Veteran's health record from the Dashboard so I can find information I may use to make care decisions. PR-1151 1.1.19

Scenario: I open a web browser and see the Individual Veteran View where I can search a Veteran's health record
Given I navigate to the http://localhost:7003/
Then I should see "Perceptive Reach Login"
Then I put in "Username" field as "vaphsfequia"
Then I put in "password" field as "FeAn#011819"
And I click on "Login" button
When I Click on "Individual View"
Then I should see search function for Veteran's health record
And I type in the Veteran's name "Jim Smith"
Then I should see the Veteran's health record 
And I click on "Logout" button