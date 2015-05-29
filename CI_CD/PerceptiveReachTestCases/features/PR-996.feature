Feature: As a Dashboard User, I want to be presented "Clinical Decision Support" information based on Clinical Practice Guidelines related to a Veteran's specific information PR-996 1.1.18
@Clinical_Decision_Support_PR_996
  Scenario: I open a web browser and use http://localhost:7003/ to see the Clinical practice Guideline widget
  Given I navigate to the http://localhost:7003/ 
  Then I should see "Perceptive Reach"
  Then I put in "email" field as "perceptiveCCT"
  Then I put in "password" field as "FeAn#011819"
  And I click on check box "checky"
  And I click on "Login" button
  When I click on "Individual View"
  Then I should see the "Patient Roster by VAMC" widget
  And I should see "Clinical Decision Support" widget
  And I click on "Logout" button