Feature: As a SPC I want to see a Veteran's list(roster)
@Veteran_roster_lsit_PR_1301
Scenario: I open a web browser and use http://localhost:7003/ to see the Veteran's list(roster)
  Given I am on http://localhost:7003/
  When I click on Individual view 
  Then I should see the widget with roster of high risk Veterans "Veteran roster"
  When I click on high risk Individual veteran "Young paul"
  Then I should see high risk veteran contact information "veteran roster"
  And I should see the name "Name"of high risk veteran
  And I should see the ssn "SSN"of high risk veteran
  And I should see the phone "Phone"of high risk veteran
  And I should see the DFT "Date First Identified"of high risk veteran
  And I should see the date updated "Date Updated"of high risk veteran
  And I should see the SRL "statistical Risk level"of high risk veteran
  And I should see the last va visit "Last VA clinician visit"of high risk veteran
  
    @high_risk_veteran
  Scenario: As a SPC I want to see the widget for high risk veteran roster which identifies newly identified high risk veterans in past 30 days.
  Given I am on http://localhost:7003/
  When I click on Individual view 
  Then I should see the widget with roster of high risk Veterans "Veteran roster" 
  When I select the filter "new veterans"for newly identified high risk veterans for past 30 days
  Then I should see list of newly identified high risk veterans for past 30 days
  When I click on a high risk veteran "Young paul"
  Then I should see high risk veteran contact information for "Young paul"  