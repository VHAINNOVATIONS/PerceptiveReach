Feature: As a SPC I want to Enable the background communications layer between all components of the dashboard.  Layout tab to Layout tab (i.e.. National to State), Widget to Widget (i.e. Veteran Roster to Supporting Widgets).  
  
  @Veteran-PatientContact_Linkaga-PR-1571

  Scenario: I open a web browser and use http://localhost:7003/ to see Linkage between Patient Roster and Patient Contact widgets
  Given I navigate to the http://localhost:7003/ 
  Then I should see "Perceptive Reach"
  Then I put in "email" field as "TESTER254"
  Then I put in "password" field as "FeAn#011819"
  And I click on check box "checky"
  And I click on "Login" button
  When I click on "Individual View"
  Then I click on the Default Widgets button
  And I click on "Logout" button
