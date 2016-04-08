Feature: AAs a Clinical Care Team Member, I want to see a pop-up message if I attempt to select a different Veteran before saving my changes. PR-3640

Scenario: I open a web browser and navigate to http://localhost:7003/ where I can view Consolidated Surveillance View widgets
Given I navigate to the http://localhost:7003/
Then I should see "Perceptive Reach"
When I put in "email" field as "TESTER260"
And I put in "password" field as "M1n@h3s4f9"
And I click on check box "checky"
And I click on "Login" button
When I click on "Individual View"
And I click on "Add a Widget" button
And I click on "enterdata" button in the menu
Then I should see "Data Entry" widget
Then I put in "hrText" field as "High Risk Flag Initiated"
When I select Another Veteran 
Then I should see "You have Unsaved changes in EnterData widget, Please Save or Undo changes and retry."
Then I click on "OK" button
And I click on "Logout" button 