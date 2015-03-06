Feature: As a Dashboard User, I want to view a Veteran's medications from within the Dashboard so I can view the Veteran's prescriptions at a glance and make outreach and care decisions.
	
	@Veteran_Medication_StatusPR_1405
Scenario: I open a web browser and use http://localhost:7003/ to see the Veteran's Medication Status in veteran medication widget
  Given I am on http://localhost:7003/
  When I click on Individual "Individual" view 
  And I click on a veteran "James Paul"
  Then I should see the  widget with list of Medications "Veteran medication" for "james Paul"
  And I should see a list of active medication "Active medications" in  the veteran medication widget
  And I should see "Albuterol .5%" in the medication status widget
  And I should see "Naproxen 500mg" in the medication status widget
  And I should see "Non-VA Aspirin 81 mg" in the medication widget 
  And I click on   "View All" in the medication status widget
  Then I should see list of all medications
  