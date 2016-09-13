Feature: As a Administrator/Supervisor, I want to access widgets in a Consolidated Surveillance View PR-2993


Scenario: I open a web browser and navigate to http://localhost:7003/ where I can view Consolidated Surveillance View widgets
Given I navigate to the http://localhost:7003/
Then I should see "Perceptive Reach"
When I put in "email" field as "TESTER254"
And I put in "password" field as "M1n@h3s4f9"
And I click on check box "checky"
And I click on "Login" button
And I click on "Surveillance View"
Then I should see "VISN Roster" widget
And I should see "Facility Roster" widget
And I should see "Age Groups Data" widget
And I should see "Gender Distribution Data" widget
And I should see "Military Branch Data" widget
And I should see "Outreach Status Data" widget
And I click on "Logout" button