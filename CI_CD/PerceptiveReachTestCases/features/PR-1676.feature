Feature: As a Dashboard User, I want to log in and log out to the Perceptive Reach application. @PR-1676 1.1.2
   
@Log_On_PR-1676

Scenario: I open a web browser and navigate to http://localhost:5000/ where I can Perceptive Reach Log on to the  Dashboard
Given I open the browser and enter http://localhost:5000/
Then I should see "Perceptive Reach Login"
Then I put in "email" field as "vaphsfequia"
Then I put in "password" field as "FeAn#011819"
And I click on "Login" button
Then I should see "National View"

Feature: As a Dashboard user, I want log out of the Dashboard to end my session. @PR-1677 1.1.2
   
@Log_Off_PR-1677

@Sign_Out_PR-1677
Scenario:  open a web browser and navigate to http://localhost:5000/ where I can Perceptive Reach Log off to the  Dashboard
Given I open the browser and enter http://localhost:5000/
Then I should see "Perceptive Reach Login"
Then I put in "email" field as "vaphsfequia"
Then I put in "password" field as "FeAn#011819"
And I click on "Login" button
Then I should see "National View"
And I click on logout


