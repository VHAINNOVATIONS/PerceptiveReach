Feature:  PR-3426 As a clinical care team member, I want to see broad topics to choose from when selecting conditions that I think are present in a patient.


Scenario: I open a web browser and navigate to http://localhost:7003/ where I can view Consolidated Surveillance View widgets
Given I navigate to the http://localhost:7003/
Then I should see "Perceptive Reach"
When I put in "email" field as "TESTER254"
And I put in "password" field as "M1n@h3s4f9"
And I click on check box "checky"
And I click on "Login" button
And I click on "Survellience" View 
And I click on "Clinical Decision Support" Widget 
Then I should see "Clinical Decision Support" Wiget
And I should see "Suicide Attempt(s)"
And I should see "3 or more Medications"
And I should see "Alcohol Use Disorder"
And I should see "Antidepressants"
And I click on "Logout" button
