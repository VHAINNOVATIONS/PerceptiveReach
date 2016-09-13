Feature: As a Dashboard User, I want to view a Veteran's medical appointments from within the Dashboard so I can view the Veteran's appointments at a glance and make outreach and care decisions PR-1407 1.1.28
  
  
@view_med_appt_PR-1407

Scenario: I open a web browser and see the medical appointments widget 
Given I navigate to the http://localhost:7003/
Then I should see "Perceptive Reach"
Then I put in "email" field as "TESTER254"
Then I put in "password" field as "FeAn#011819"
And I click on check box "checky"
And I click on "Login" button
When I click on "Individual View"
Then I should see the "Patient Roster by VAMC" widget
Then I should see the "Appointment" widget
And I should see "Cancelled"
And I should see "Date"
And I click on "Logout" button





  
