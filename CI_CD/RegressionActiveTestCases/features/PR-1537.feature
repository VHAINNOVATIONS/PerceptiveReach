Feature: As a Dashboard User, I want to view a Veteran's recent medical diagnoses from within the Dashboard so I can view the Veteran's recent issues at a glance and make outreach and care decisions PR-1537 1.1.29

	@Veteran_Diagnoses_PR_1537
Scenario: I open a web browser and use http://localhost:7003/ to see the Veteran's Outreach Status in veteran roaster widget
  Given I navigate to the http://localhost:7003/
  Then I should see "Perceptive Reach"
  Then I put in "email" field as "TESTER254"
  Then I put in "password" field as "FeAn#011819"
  And I click on check box "checky"
  And I click on "Login" button
  When I click on "Individual View"
  Then I should see the "Patient Roster by VAMC" widget
  And I should see the "Diagnoses" widget
  And I should see "Diagnosis"
  And I should see "ICD"
  And I should see "Date" 
  And I click on "Logout" button

  
  


