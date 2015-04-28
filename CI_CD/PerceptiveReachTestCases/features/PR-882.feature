Feature: As a Dashboard User, I want to view a graphic in a widget that allows me to see basic information related to a VA facility. PR-882 1.1.17
Scenario: 
Given I navigate to the http://localhost:7003/
Then I should see "Perceptive Reach Login"
Then I put in "Username" field as "vaphsfequia"
Then I put in "password" field as "FeAn#011819"
And I click on "Login" button
Then I click on the "Facility View"
And I should see "VA Facility" widget
And I click on "Logout" button