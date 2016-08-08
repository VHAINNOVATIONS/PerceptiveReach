Feature: As a Dashboard user, I want to see a button that allows me to remove a Veteran from the Patient Roster by VAMC widget PR-4585

Scenario: I open a web browser and navigate to http://localhost:7003/ where I can view Consolidated Surveillance View widgets
Given I navigate to the http://localhost:7003/
Then I should see "Perceptive Reach"
When I put in "email" field as "vaphsupadhv"
And I put in "password" field as "M1n@h3s4f9"
And I click on check box "checky"
And I click on "Login" button
When I click on "Individual View"
And I click on "Add a Widget" button
And I click on "RosterTable" button in the menu
Then I should see the "Patient Roster by VAMC" widget
Then I should see Remove Patient button
And I click on "Logout" button 