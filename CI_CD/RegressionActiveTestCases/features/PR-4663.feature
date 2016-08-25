Feature: As an IRDS user, I want checkboxes to appear in the outreach status pop-up window that clearly outline what my actions are as a facility coordinator or care provider.  PR-4663 1.1.7
@PR-4663
Scenario: PR-4663
Given I navigate to the http://localhost:7003/
  Then I should see "Perceptive Reach"
  Then I put in "email" field as "TESTER254"
  Then I put in "password" field as "FeAn#011819"
  And I click on check box "checky"
  And I click on "Login" button
  When I click on "Individual View" 
  Then I should see the "Patient Roster by VAMC" widget
  Then I should select "checkbox" in the Data Entry widget
  And I click on "Logout" button



