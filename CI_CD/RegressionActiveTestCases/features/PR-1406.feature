Feature: As a Dashboard User, I want to view a Veteran's Patient Risk Flags (PRF) from within the Dashboard so I can view the Veteran's prescriptions at a glance and make outreach and care decisions. @PR-1406 1.1.27


@view_patientriskflags_PR-1406

Scenario: I open a web browser and see the patient risk flags widget
Given I navigate to the http://localhost:7003/
Then I should see "Perceptive Reach"
Then I put in "email" field as "vaphsfequia"
Then I put in "password" field as "FeAn#011819"
And I click on check box "checky"
And I click on "Login" button
When I click on "Individual View"
Then I should see the "Patient Flags" widget
And I should see "Flags"
And I should see "Cat"
And I click on "Logout" button

