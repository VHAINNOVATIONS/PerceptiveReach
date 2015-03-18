Feature: Enable the background communications layer between all components of the dashboard.  Layout tab to Layout tab (i.e.. National to State), Widget to Widget (i.e. Veteran Roster to Supporting Widgets).  
PR-XXXX 
  Scenario: I open a web browser and use http://localhost:7003/ to see the Clinical practice Guideline widget
  Given I navigate to the http://localhost:7003/ 
  When I click on "Facility View"
  Then I should see the "Veteran Roster by VAMC" widget
  When I click on edit on the "Veteran Roster by VAMC" widget
  And I click on the VAMC dropdown
  And I choose "(V01)(518) Bedford,MA" as VAMC
  And I click on "OK" button
  Then I should see the "Veteran Roster by VAMC" widget
  When I select "Veteran_*, Vet* A"
  Then I should see my default widgets
  And I add the "Medication" widget
  Then I should see the "Medication" widget