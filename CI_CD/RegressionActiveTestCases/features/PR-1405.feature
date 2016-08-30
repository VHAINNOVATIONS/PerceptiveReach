Feature: As a Dashboard User, I want to view a Veteran's medications from within the Dashboard so I can view the Veteran's prescriptions at a glance and make outreach and care decisions. @PR-1405 1.1.26

@view_medicationswidget_PR-1405

Scenario: I open a web browser and see the Veteran's medication widget
Given I navigate to the http://localhost:7003/
Then I should see "Perceptive Reach"
Then I put in "email" field as "TESTER_1405"
Then I put in "password" field as "G4j6k$y0s8"
And I click on check box "checky"
And I click on "Login" button
When I click on "Individual View"
Then I click on the Default Widgets button
Then I should see the "Medication" widget
And I should see "Amoxicillin"
And I click on "Logout" button

