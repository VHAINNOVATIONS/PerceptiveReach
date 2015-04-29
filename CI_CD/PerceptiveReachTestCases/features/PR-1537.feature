Feature: As a Dashboard User, I want to view a Veteran's recent medical diagnoses from within the Dashboard so I can view the Veteran's recent issues at a glance and make outreach and care decisions PR-1537 1.1.29

	@Veteran_Problem_List_PR_1537
Scenario: I open a web browser and use http://localhost:7003/ to see the Veteran's Outreach Status in veteran roaster widget
  Given I navigate to the http://localhost:7003/
  Then I should see "Perceptive Reach Login"
  Then I put in "Uemail" field as "vaphsfequia"
  Then I put in "password" field as "FeAn#011819"
  And I click on "Login" button
  When I click on "Individual View"
  Then I should see the "Patient Roster by VAMC" widget
  And I should see the "Diagnoses" widget
  And I should see "Diagnosis"
  And I should see "ICD"
  And I should see "Date" 
  And I click on "Logout" button

  
  @active_prob_PR-1537

Scenario: When I am at the Medical Appointments widget I should be able to see all appointments at the same time
Given I navigate to the http://localhost:7003/
Then I should see "Perceptive Reach Login"
Then I put in "email" field as "vaphsfequia"
Then I put in "password" field as "FeAn#011819"
And I click on "Login" button
When I click on "Individual View"
Then I should see the "problem Diagnoses" widget
Then I click on "Active Problems"
And I should see "Hypertension (ICD 401)"
And I should see "Type II Diabetes (ICD 250)"
And I click on "Logout" button


