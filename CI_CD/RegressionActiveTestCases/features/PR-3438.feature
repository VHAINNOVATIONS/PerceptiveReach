Feature: PR-3438  As a Administrator/Supervisor, I want to access Clinican Data Support in the Veteran Roster 


Scenario: I open a web browser and navigate to http://localhost:7001/ where I can view Consolidated Surveillance View widgets
Given I navigate to the http://localhost:7001/
Then I should see "Perceptive Reach"
When I put in "email" field as "TESTER254"
And I put in "password" field as "M1n@h3s4f9"
And I click on check box "checky"
And I click on "Login" button
And I click on "Clinical Data  Support"
Then I should see "Clinical Data  Support" Wiget
And I click on "Next" 
And I should see "Condition" Widget
And I click on "Next" 
And I should see "Questions" Widget
And I click on "Next" 
And I should see "Treatment" Widget
And I click on "Next" 
And I should see "Guidelines" Widget
And I click on "Logout" button