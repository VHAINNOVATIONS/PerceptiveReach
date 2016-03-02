Feature: Prevent Roster widgets from being deleted from the Dashboard PR-3760 
@Prevent_Individual_Roster_widgets_deletion-PR_3760
Scenario: I open a web browser and see the Patient Rooster widget 

Given I navigate to the http://localhost:7003/
Then I should see "Perceptive Reach"
Then I put in "email" field as "TESTER254"
Then I put in "password" field as "q@G5v9d4k*"
And I click on check box "checky"
And I click on "Login" button
When I click on "Individual View"
Then I click on the Default Widgets button
Then I should see the "Patient Roster by VAMC" widget
And I click on close on the "RoosterTable" widget
Then I should see the "Patient Roster by VAMC" widget
And I click on "Logout" button

@Prevent_Surveillance_Rooster_Deletion-PR_3760
Scenario: I open a web browser and see the VISN Rooster widget 

Given I navigate to the http://localhost:7003/
Then I should see "Perceptive Reach"
Then I put in "email" field as "TESTER254"
Then I put in "password" field as "q@G5v9d4k*"
And I click on check box "checky"
And I click on "Login" button
When I click on "Surveillance View"
Then I should see the "VISN Roster" widget
And I click on close on the "VISNTable" widget
Then I should see the "VISN Roster" widget
Then I should see the "Facility Roster" widget
And I click on close on the "FacilityTable" widget
Then I should see the "Facility Roster" widget
And I click on "Logout" button

@Prevent_Facility_Rooster_Deletion-PR_3760
Scenario: I open a web browser and see the Facility Rooster widget 

Given I navigate to the http://localhost:7003/
Then I should see "Perceptive Reach"
Then I put in "email" field as "TESTER254"
Then I put in "password" field as "q@G5v9d4k*"
And I click on check box "checky"
And I click on "Login" button
When I click on "Facility View"
Then I should see the "Facility Roster" widget
And I click on close on the "FacilityTable" widget
Then I should see the "Facility Roster" widget
And I click on "Logout" button