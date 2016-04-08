Feature: As a Dashboard user, I want log out of the Dashboard to end my session. PR-1678 1.1.31
   
@Log_Off_PR-1678

Scenario:  open a web browser and navigate to http://localhost:7003/ where I can Perceptive Reach Logout to the  Dashboard

Given I navigate to the http://localhost:7003/
Then I should see "Perceptive Reach"
Then I put in "email" field as "TESTER254"
Then I put in "password" field as "FeAn#011819"
And I click on check box "checky"
And I click on "Login" button
Then I should see "Individual View"
And I click on "Logout" button
