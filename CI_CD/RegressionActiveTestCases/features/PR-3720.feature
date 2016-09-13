Feature: Data Widget- Saving blank data when you press Add Data PR-3720

Scenario: I open a web browser and navigate to http://localhost:7003/ where I can view Consolidated Surveillance View widgets
Given I navigate to the http://localhost:7003/
Then I should see "Perceptive Reach"
When I put in "email" field as "TESTER260"
And I put in "password" field as "M1n@h3s4f9"
And I click on check box "checky"
And I click on "Login" button
When I click on "Individual View"
Then I click on the Default Widgets button
Then I should see "Data Entry" widget
Then I put in "hrText" field as "I have initiated High Risk Flag"
Then I click on "Add Data" button
Then I put in "hrText" field as "     "
Then I should select "Add Data" button in the Data Entry widget
Then I see "I have initiated High Risk Flag" in field "hrText"
And I click on "Logout" button 