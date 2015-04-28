Feature: As a Dashboard User, I want to access Dashboard "views" that summarize data for a specific facility service area, state, VISN, Region, or nationally per corresponding view (Facility, VISN, National). PR-353 1.2.4

Scenario: 
Given I navigate to the http://localhost:7003/
Then I should see "Perceptive Reach Login"
Then I put in "Username" field as "vaphsfequia"
Then I put in "password" field as "FeAn#011819"
And I click on "Login" button
When I click on "State View"
Then I should see a view that summarizes data for a specific state
When I click on "VISN View"
Then I should see a view that summarizes data for a specific region
When I click on "National View"
Then I should see a view that summarizes data on a National level
And I click on "Logout" button