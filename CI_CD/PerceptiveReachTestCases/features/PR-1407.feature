Feature: As a Dashboard User, I want to view a Veteran's medical appointments from within the Dashboard so I can view the Veteran's appointments at a glance and make outreach and care decisions PR-1407 1.1.28
  
  
@view_med_appt_PR-1407

Scenario: I open a web browser and see the medical appointments widget 
Given I navigate to the http://localhost:7003/
When I click on "Individual View"
Then I should see the "Veteran Roster by VAMC" widget
Then I should see the "Appointment" widget
And I should see "Type"
And I should see "Canceled"
And I should see "Date"
And I should see "Show"

@click_btw_appts_PR-1407

Scenario: When I am at the Medical Appointments widget I should be able to click between upcoming and previous appointments
Given I navigate to the http://localhost:7003/
When I click on "Individual View"
Then I should see the "Veteran Roster by VAMC" widget
Then I should see the "Appointment" widget
When I click on "Upcoming Appointments"
Then I should see "Upcoming Appointments"
When I click on "Previously Completed Appointments"
Then I should see "Previously Completed Appointments"

@see_all_appts_PR-1407

Scenario: When I am at the Medical Appointments widget I should be able to see all appointments at the same time
Given I navigate to the http://localhost:7003/
When I click on "Individual View"
Then I should see the "Veteran Roster by VAMC" widget
Then I should see the "Appointment" widget
When I click on "All Appointments"
Then I should see "All Appointments"

@Veteran_Appointments_PR_1407
Scenario: I open a web browser and use http://localhost:7003/ to see the Veteran's Outreach Status in veteran roaster widget
  Given I navigate to the http://localhost:7003/
  When I click on "Individual View" 
  Then I should see the "Veteran Roster by VAMC" widget
  And I should see the "Appointment" widget
  And I should see " search for appointment" 
  And I should see "view all"
  And I should see "Veteran appointments"
  When I click on "Active appointments"
  Then I should see "June 3, 2014 Unscheduled Endocrinology Clinic"
  And I should see "May 4, 2014 Primary Care"

  
