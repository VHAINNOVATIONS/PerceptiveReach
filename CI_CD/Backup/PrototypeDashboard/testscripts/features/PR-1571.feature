Feature: As a SPC I want to Enable the background communications layer between all components of the dashboard.  Layout tab to Layout tab (i.e.. National to State), Widget to Widget (i.e. Veteran Roster to Supporting Widgets).  
@Veteran_Clinical_support_Decision_widget_PR-1571

  Scenario: I open a web browser and use http://localhost:7003/ to see the Clinical support Decision widget
  Given I navigate to the http://localhost:7003/ 
  When I click on "Facility View"
  Then I should see the "Veteran Roster by VAMC" widget
  When I click on edit on the "Veteran Roster by VAMC" widget
  And I choose "(V01)(518) Bedford,MA" as VAMC
  And I click on "OK" button
  Then I should see the "Veteran Roster by VAMC" widget
  When I select medium risk veteran row in the widget
  Then I should see the "Clinical Decision Support" widget
  And I should see "Chronic Intermediate Risk"
  When I select high risk veteran row in the widget
  Then I should see the "Clinical Decision Support" widget
  And I should see "Chronic High Risk"
  And I click on "Add a Widget" button
  And I click on "Add a Widget" button
  And I click on "medication" button
  Then I should see the "medication" widget
  
  @Veteran-Medication_Linkage-PR-1571
  
  Scenario: I open a web browser and use http://localhost:7003/ to see Medication widget for Individual veteran
  Given I navigate to the http://localhost:7003/ 
  When I click on "Individual View"
  Then I should see the "Veteran Roster by VAMC" widget
  When I select a veteran row in the widget
  Then I should see the "Medication" widget  
  When I click on "Add a Widget" button
  And I click on "Add a Widget" button
  And I click on "medication" button
  Then I should see the "medication" widget
  