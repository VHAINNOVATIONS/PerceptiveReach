Feature: As a clinical care team member, I want to select conditions via a checklist that I think are present in a patient. PR-3433

Scenario: I open a web browser and navigate to http://localhost:7003/ where I can view CDS Questionnaire widget
Given I navigate to the http://localhost:7003/
Then I should see "Perceptive Reach"
When I put in "email" field as "TESTER_CDS"
And I put in "password" field as "M1n@h3s4f9"
And I click on check box "checky"
And I click on "Login" button
When I click on "Individual View"
Then I should see "CDS Questionnaire" widget
Then I should see "Clinical Decision Support"
Then I should see "Please choose the specific symptoms, diagnoses, or conditions the Veteran is facing. After all selections have been made please press "
Then I should see "Next" 
Then I should see "Reset Selection" 
And I click on "Logout" button