Feature: As a Dashboard User, I want to be presented "Clinical Decision Support" information based on Clinical Practice Guidelines related to a Veteran's specific information PR-996
  Scenario: I open a web browser and use http://localhost:7003/ to see the Clinical practice Guideline widget
  Given I navigate to the http://localhost:7003/ 
  When I click on "Individual view"
  Then I should see the "Veteran Roster by VAMC" widget
  And I should see the "clinical practice guidelines" widget