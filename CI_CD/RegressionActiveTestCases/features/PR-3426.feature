Feature:  PR-3426 As a clinical care team member, I want to see broad topics to choose from when selecting conditions that I think are present in a patient.

Scenario: I open a web browser and navigate to http://localhost:7001/ where I can view CDSQuestionnaire widget and chose from conditions
Given I navigate to the http://localhost:7001/
Then I should see "Perceptive Reach"
When I put in "email" field as "TESTER254"
And I put in "password" field as "M1n@h3s4f9"
And I click on check box "checky"
And I click on "Login" button
And I click on "Survellience" View 
And I click on "CDSQuestionnaire" Widget 
Then I should see "CDS Questionnaire" Wiget
And I should see "Please choose the specific symptoms, diagnoses, or conditions the Veteran is facing. After all selections have been made please press ‘Next’"
And I should see "Suicide Attempt(s)"
And I should see "3 or more Medications"
And I should see "Alcohol Use Disorder"
And I should see "Antidepressants"
And I click on "Logout" button
