Feature: As a clinical care team member, I want to select conditions via a checklist that I think are present in a patient. PR-3427

Scenario: I open a web browser and navigate to http://localhost:7003/ where I can view CDS Questionnaire widget
Given I navigate to the http://localhost:7003/
Then I should see "Perceptive Reach"
When I put in "email" field as "TESTER_CDS"
And I put in "password" field as "M1n@h3s4f9"
And I click on check box "checky"
And I click on "Login" button
When I click on "Individual View"
Then I should see "CDS Questionnaire" widget
And I should see "Clinical Decision Support"
And I should see "Alcohol Use Disorder"
Then I should click on Condition1 button
And I click on CDSNext1 button
Then I should see "Alcohol Use Disorder"
Then I should see "2. Receiving psychosocial treatment?"
Then I should select the first option in dropdown
And I click on "Next" button
Then I should see "Treatment(s)"
And I click on "Logout" button


