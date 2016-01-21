Feature: As a clinical care team member, I want to select conditions via a checklist that I think are present in a patient. PR-3427

Scenario: I open a web browser and navigate to http://localhost:7001/ where I can view CDS Questionnaire widget
Given I navigate to the http://localhost:7001/
Then I should see "Perceptive Reach"
When I put in "email" field as "TESTER254"
And I put in "password" field as "M1n@h3s4f9"
And I click on check box "checky"
And I click on "Login" button
And I click on "Survellience" View 
And I click on "CDSQuestionnaire" Widget 
Then I should see "CDS Questionnaire" Wiget
And I should see "Alcohol Use Disorder"
And I click on check box "checky"
And I should see "Antidepressants"
And I click on check box "checky"
And I click on "Logout" button