Feature: As a Dashboard User, I want to view a Veteran's medications from within the Dashboard so I can view the Veteran's prescriptions at a glance and make outreach and care decisions.
	
	@Veteran_Medication_StatusPR_1405
Scenario: I open a web browser and use http://localhost:7003/ to see the Veteran's Medication Status in veteran medication widget
  Given I am on http://localhost:7003/
  When I click on Individual "Individual" view 
  Then I should see the  widget with list of Medications widget "Medication"
  And I should see "Prescription 1"
  