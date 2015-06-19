Feature: As a system administrator, I want any user who attempts three invalid logins to be locked out of the system PR-2081 1.1.69

Scenario: I open a web browser and navigate to http://localhost:7003/ where I can Perceptive Reach Login to the  Dashboard
Given I open the browser and enter http://localhost:7003/

Then I should see "Perceptive Reach"
Then I put in "email" field as "vaphsfequia"
Then I put in "password" field as "perce456"
And I click on check box "checky"
And I click on "Login" button

Then I put in "email" field as "vaphsfequia"
Then I put in "password" field as "perce456"
And I click on check box "checky"
And I click on "Login" button

Then I put in "email" field as "vaphsfequia"
Then I put in "password" field as "perce456"
And I click on check box "checky"
And I click on "Login" button
And I should see "Account locked, Please contact system admin." 

