Feature: As a Dashboard user, I want to prominently see a Veterans name at the top of the Dashboard, or individual widget, when I have selected a individual Veteran from the Roster widget. PR-1927

Scenario:  open a web browser and navigate to http://localhost:7003/ where I want to prominently see a Veterans name at the top of the Dashboard

Given I navigate to the http://localhost:7003/
Then I should see "Perceptive Reach"
Then I put in "email" field as "vaphsgattuc"
Then I put in "password" field as "FeAn#011819"
And I click on check box "checky"
And I click on "Login" button
Then I should see "Individual View"
And I select the veteran "Veteran_109258,Vet109258"
Then I should see "Veteran_109258,Vet109258"
And I click on "Logout" button