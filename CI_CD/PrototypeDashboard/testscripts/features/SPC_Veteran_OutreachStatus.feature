Feature: As a Dashboard user, I want the ability to update a Veteran's outreach status so that I can track what Veterans have not yet been contacted, which Veterans are in outreach / intervention services, which Veterans have refused service, etc. 
  
  @Veteran_Outreach_StatusPR_1380
Scenario: I open a web browser and use http://localhost:7003/ to see the Veteran's Outreach Status in veteran roaster widget
  Given I navigate to the http://localhost:7003/
  When I click on "Individual View" 
  Then I should see the "Veteran Roster by VAMC" widget
  And I should see "Outreach Status" column
  And I should see "Not Contacted" option in the dropdown
  And I should see "Outreach Initiated" option in the dropdown
  And I should see "Outreach Attempted" option in the dropdown
  And I should see "Services Refused" option in the dropdown
  And I should see "No Additional Outreach Required" option in the dropdown