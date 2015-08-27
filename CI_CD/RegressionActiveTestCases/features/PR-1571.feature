Feature: As a SPC I want to Enable the background communications layer between all components of the dashboard.  Layout tab to Layout tab (i.e.. National to State), Widget to Widget (i.e. Veteran Roster to Supporting Widgets).  
@Veteran_Clinical_support_Decision_widget_PR-1571

  Scenario: I open a web browser and use http://localhost:7003/ to see the Clinical support Decision widget
  Given I navigate to the http://localhost:7003/ 
  Then I should see "Perceptive Reach"
  Then I put in "email" field as "vaphsfequia"
  Then I put in "password" field as "FeAn#011819"
  And I click on check box "checky"
  And I click on "Login" button
  When I click on "Individual View"
  Then I should see the "Patient Roster by VAMC" widget
  When I select middle risk veteran row in the widget
  Then I should see the "Clinical Decision Support" widget
  And I should see "Chronic MIDDLE Risk"
  When I select top risk veteran row in the widget
  Then I should see the "Clinical Decision Support" widget
  And I should see "Chronic TOP Risk "
  And I click on "Add a Widget" button
  And I click on "medication" button in the menu
  And I click on save changes button
  Then I should see the "medication" widget
  And I click on "Logout" button
  
  @Veteran-Medication_Linkage-PR-1571
  
  Scenario: I open a web browser and use http://localhost:7003/ to see Medication widget for Individual veteran
  Given I navigate to the http://localhost:7003/ 
  Then I should see "Perceptive Reach"
  Then I put in "email" field as "vaphsfequia"
  Then I put in "password" field as "FeAn#011819"
  And I click on check box "checky"
  And I click on "Login" button
  When I click on "Individual View"
  Then I should see the "Patient Roster by VAMC" widget
  When I select top risk veteran row in the widget
  Then I should see the "medication" widget  
  And I click on "Logout" button
  
  