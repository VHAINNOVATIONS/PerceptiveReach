Feature: As a Dashboard User, I want to view a Veteran's medical appointments from within the Dashboard so I can view the Veteran's prescriptions at a glance and make outreach and care decisions.  @PR-1407
   
@view_med_appt_PR-1407

Scenario: I open a web browser and see the medical appointments widget 
Given I navigate to the http://localhost:7003/
When I click on Individual View
Then I should see the "Medical Appointments" widget
And I should also see "Upcoming Appointments"
And I should also see "Previously Completed Appointments"
And I should also see "Cancelled Appointments"
And I should also see "Missed Appointments"

@click_btw_appts_PR-1407

Scenario: When I am at the Medical Appointments widget I should be able to click between upcoming and previous appointments
Given I navigate to the http://localhost:7003/
When I click on Individual View
Then I should see the "Medical Appointments" widget
Then I should be able to click on "Upcoming Appointments"
And I should be able to see all "Upcoming Appointments"
Then I should be able to click on "Previously Completed Appointments"
And I should be able to see all "Previously Completed Appointments"

@see_all_appts_PR-1407

Scenario: When I am at the Medical Appointments widget I should be able to see all appointments at the same time
Given I navigate to the http://localhost:7003/
When I click on Individual View
Then I should see the "Medical Appointments" widget
Then I should click on "All Appointments"
And I should be able to see "All Appointments"
