Feature: As a Dashboard user, I want to verify user roles based security for the Perceptive Reach application PR-728

@Systemadmin_PR-728

Scenario: I open a web browser and navigate to http://localhost:7003/ where I can Perceptive Reach Login to the  Dashboard as a system administrator
Given I navigate to the http://localhost:7003/
Then I should see "Perceptive Reach"
Then I put in "email" field as "TESTER254"
Then I put in "password" field as "FeAn#011819"
And I click on check box "checky"
And I click on "Login" button
Then I should see "Individual View"
And I should see "Facility View"
And I should see "Surveillance View"
And I click on "Logout" button


@ClinicalCareTeamMember_PR-728

Scenario: I open a web browser and navigate to http://localhost:7003/ where I can Perceptive Reach Login to the  Dashboard as a Clinical Care Team Member
Given I navigate to the http://localhost:7003/
Then I should see "Perceptive Reach"
Then I put in "email" field as "TESTER254"
Then I put in "password" field as "FeAn#011819"
And I click on check box "checky"
And I click on "Login" button
Then I should see "Individual View"
And I should see "Facility View"
And I click on "Logout" button




@Reporter_PR-728

Scenario: I open a web browser and navigate to http://localhost:7003/ where I can Perceptive Reach Login to the  Dashboard as a Reporter
Given I navigate to the http://localhost:7003/
Then I should see "Perceptive Reach"
Then I put in "email" field as "TESTER254"
Then I put in "password" field as "FeAn#011819"
And I click on check box "checky"
And I click on "Login" button
Then I should see "Individual View"
And I should see "Facility View"
And I should see "Surveillance View"
And I click on "Logout" button





