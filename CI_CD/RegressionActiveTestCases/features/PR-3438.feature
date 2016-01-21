Feature: PR-3438  As a Administrator/Supervisor, I want to access Clinican Data Support in the Veteran Roster 


Scenario: I open a web browser and navigate to http://localhost:7001/ where I can view Consolidated Surveillance View widgets
Given I navigate to the http://localhost:7001/
Then I should see "Perceptive Reach"
When I put in "email" field as "TESTER254"
And I put in "password" field as "M1n@h3s4f9"
And I click on check box "checky"
And I click on "Login" button
And I click on "CDS Questionnaire"
Then I should see "CDS Questionnaire" Wiget
And I click on "Survellience" View 
And I click on "CDS Questionnaire" Widget 
Then I should see "CDS Questionnaire" Wiget
And I should see "Please choose the specific symptoms, diagnoses, or conditions the Veteran is facing. After all selections have been made please press ‘Next’"
And I should see "Home" 
And I should see "Options" 
And I should see "Help" 
And I click on "Logout" button