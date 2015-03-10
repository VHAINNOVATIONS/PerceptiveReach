Feature: As a Dashboard user, I want the ability to update a Veteran's outreach status so that I can track what Veterans have not yet been contacted, which Veterans are in outreach / intervention services, which Veterans have refused service, etc. 
	
	@Veteran_Outreach_StatusPR_1380
Scenario: I open a web browser and use http://localhost:7003/ to see the Veteran's Outreach Status in veteran roaster widget
 Given I navigate to the http://localhost:7003/
  When I click on Individual "Individual" view 
  Then I should see the roster widget with list of Veterans "Veteran Roster by VAMC"
  And I should see a column "Outreach Status" in  the veterans roster widget
  And I should see not contacted "Not Contacted" in the outreach status dropdown
  And I should see outreach initiated "Outreach Initiated" in the outreach status column
  And I should see outreach attempted "Outreach Attempted" in the outreach status column
  And I should see service refused "Services Refused" in the outreach status column
  And I should see no additional outreach "No Additional Outreach Required" in the outreach status column