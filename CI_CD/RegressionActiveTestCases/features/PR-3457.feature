Feature: As a Clinical Care Team Member, I want the read-only field to populate with updated Safety Plan information on a monthly basis. PR-3457

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
Then I put in "commentText" field as "Added Safety Plan  and High Risk Flag"
And I click on Add Data button
And I click on "Logout" button