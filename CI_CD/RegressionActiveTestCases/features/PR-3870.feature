Feature: As a Dashboard user, I want to see an export button on the tabular widgets in all Dashboard views (Individual, Facility, Surveillance) that allows me to export an excel file of the information in the widgets. PR-3870

 
Scenario: I open a web browser and use http://localhost:7003/ to see the VAMC Widget
Given I navigate to the http://localhost:7003/ 
Then I should see "Perceptive Reach"
Then I put in "email" field as "TESTER260"
Then I put in "password" field as "FeAn#011819"
And I click on check box "checky"
And I click on "Login" button
When I click on "Individual View"
Then I should see the "Patient Roster by VAMC" widget
Then I click on link "PatientExport"
And I click on "Logout" button