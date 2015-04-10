Feature: As a Dashboard User, I want to view a Veteran's recent medical diagnoses from within the Dashboard so I can view the Veteran's recent issues at a glance and make outreach and care decisions PR-1537

	@Veteran_Problem_List_PR_1537
Scenario: I open a web browser and use http://localhost:7003/ to see the Veteran's Outreach Status in veteran roaster widget
  Given I navigate to the http://localhost:7003/
  When I click on "Individual View"
  Then I should see the "Veteran Roster by VAMC" widget
  And I should see the "Veteran Diagnosis" widget
  And I should see "Active problems"
  And I should see "view all"
  And I should see "Search for a Problem" 
  
  @active_prob_PR-1537

Scenario: When I am at the Medical Appointments widget I should be able to see all appointments at the same time
Given I navigate to the http://localhost:7003/
When I click on "Individual View"
Then I should see the "problem Diagnosis" widget
Then I click on "Active Problems"
And I should see "Hypertension (ICD 401)"
And I should see "Type II Diabetes (ICD 250)"

