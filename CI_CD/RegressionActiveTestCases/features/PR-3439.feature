Feature: As a Clinical Care Team Member, I want to enter a date for when a High Risk Flag was initiated, if / when one has been initiated for the patient. PR-3439

Scenario: I open a web browser and navigate to http://localhost:7003/ where I can view Data Entry Widget
Given I navigate to the http://localhost:7003/
Then I should see "Perceptive Reach"
When I put in "email" field as "TESTER260"
And I put in "password" field as "M1n@h3s4f9"
And I click on check box "checky"
And I click on "Login" button
When I click on "Individual View"
Then I click on the Default Widgets button
Then I should see "Data Entry" widget
Then I select first Veteran
Then I put in "hrText" field as " Risk Initiated Date -03/15/2016"
Then I should select "Add Data" button in the Data Entry widget
And I click on "Logout" button

