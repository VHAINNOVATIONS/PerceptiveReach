Feature: As a Dashboard user, I want to enter my credentials (username and password) to log in to the Dashboard. PR-1676 1.1.2

  
@Log_On_PR-1676

Scenario: I open a web browser and navigate to http://localhost:5000/ where I can Perceptive Reach Log on to the  Dashboard

Given I open the browser and enter http://localhost:5000/
Then I should see "Perceptive Reach Login"
Then I put in "email" field as "vaphsfequia"
Then I put in "password" field as "FeAn#011819"
And I click on "Login" button
Then I should see "National View"
   
