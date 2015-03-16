Feature: As a Dashboard User, I want to view a Veteran's medical appointments from within the Dashboard so I can view the Veteran's appointments at a glance and make outreach and care decisions PR-1407
	
	@Veteran_Appointments_PR_1407
Scenario: I open a web browser and use http://localhost:7003/ to see the Veteran's Outreach Status in veteran roaster widget
  Given I am on http://localhost:7003/
  When I click on "Individual View" 
  Then I should see the "Veteran Roster by VAMC" widget
  And I should see the "Veteran appointments" widget
  And I should see "Search for an appointments"
  And I should see  "view all"
  And I should see "appointments"