Feature: As a Clinical Care Team Member,I want to enable IRDS User at Multiple Facilities PR-3851

Scenario: I open a web browser and navigate to http://localhost:7003/ where I can view Consolidated Surveillance View widgets
Given I navigate to the http://localhost:7003/
Then I should see "Perceptive Reach"
When I put in "email" field as "TESTERCCS"
And I put in "password" field as "M1n@h3s4f9"
And I click on check box "checky"
And I click on "Login" button
Then I should see "Facility View" 
Then I should see "Individual View" 
Then I should not see "Surveillance View"
And I click on "Logout" button 

@Check_Facility_View-PR-3851
Scenario: I open a web browser and see Facility View for CCS User 

Given I navigate to the http://localhost:7003/
Then I should see "Perceptive Reach"
Then I put in "email" field as "TESTERCCS"
Then I put in "password" field as "M1n@h3s4f9"
And I click on check box "checky"
And I click on "Login" button
When I click on "Facility View"
Then I should see the "Facility Roster" widget
Then I should see Facility "(V16) (623) Muskogee, OK" 
Then I should see Facility " (V10) (541) Cleveland- Wade Park, OH" 
Then I should see Facility "(V05) (613) Martinsburg, WV" 
And I click on "Logout" button