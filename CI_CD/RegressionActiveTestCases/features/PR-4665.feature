Feature: As an IRDS user, I would like to be able to save my updates to the Outreach Status checklist PR-4665 1.1.7
@PR-4665
Scenario: PR-4665
Given I navigate to the http://localhost:7003/
  Then I should see "Perceptive Reach"
  Then I put in "email" field as "TESTER254"
  Then I put in "password" field as "FeAn#011819"
  And I click on check box "checky"
  And I click on "Login" button
  When I click on "Individual View" 
  Then I should see the "Patient Roster by VAMC" widget
  Then I should select "checkbox" in the Data Entry widget
  Then I should select "Add Data" button in the Data Entry widget
  And I click on "Logout" button