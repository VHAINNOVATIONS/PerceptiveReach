Feature: As a Dashboard user, I want to verify user roles based security for the Perceptive Reach application PR-728

@Systemadmin_PR-728

Scenario: I open a web browser and navigate to http://localhost:7003/ where I can Perceptive Reach Login to the  Dashboard as a system administrator
Given I open the browser and enter http://localhost:7003/
Then I should see "Perceptive Reach Login"
Then I put in "Username" field as "vaphsfequia"
Then I put in "password" field as "FeAn#011819"
And I click on "Login" button
Then I should see "Individual View"
And I should see "Facility View"
And I should see "National View"
And I should see "System Administrator tools"
And I should see "KNIME & MYSQL Access"
And I click on "Logout" button


@ClinicalCareTeamMember_PR-728

Scenario: I open a web browser and navigate to http://localhost:7003/ where I can Perceptive Reach Login to the  Dashboard as a Clinical Care Team Member
Given I open the browser and enter http://localhost:7003/
Then I should see "Perceptive Reach Login"
Then I put in "Username" field as "vaphsfequia"
Then I put in "password" field as "FeAn#011819"
And I click on "Login" button
Then I should see "Individual View"
And I should see "Facility View"
And I click on "Logout" button

@Researcher_PR-728

Scenario: I open a web browser and navigate to http://localhost:7003/ where I can Perceptive Reach Login to the  Dashboard as a Researcher
Given I open the browser and enter http://localhost:7003/
Then I should see "Perceptive Reach Login"
Then I put in "Username" field as "vaphsfequia"
Then I put in "password" field as "FeAn#011819"
And I click on "Login" button
Then I should see "KNIME & MYSQL Access"
And I click on "Logout" button


@Reporter_PR-728

Scenario: I open a web browser and navigate to http://localhost:7003/ where I can Perceptive Reach Login to the  Dashboard as a Reporter
Given I open the browser and enter http://localhost:7003/
Then I should see "Perceptive Reach Login"
Then I put in "Username" field as "vaphsfequia"
Then I put in "password" field as "FeAn#011819"
And I click on "Login" button
Then I should see Individual View
And I should see "Facility View"
And I should see "National View"
And I should see "KNIME & MYSQL Access"
And I click on "Logout" button





