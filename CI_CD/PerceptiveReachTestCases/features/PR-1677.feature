Feature: As a Dashboard user, I want my log in to be rejected if my credentials are not accurate or valid. PR-1677 1.1.30
   
@Negative_Logon_PR-1677

Scenario: I open a web browser and navigate to http://localhost:7003/ where I can Perceptive Reach invalid Login to the  Dashboard

Given I open the browser and enter http://localhost:7003/
Then I should see "Perceptive Reach Login"
Then I put in "email" field as "vaphsfequia"
Then I put in "password" field as "FeAn#011q1123"
And I click on "Login" button
Then I should see "Invalid username/password combination. Please try again."