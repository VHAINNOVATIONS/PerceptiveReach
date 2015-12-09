 Feature: As a Dashboard user, I want the ability to update a Veteran's outreach status so that I can track what Veterans have not yet been contacted, which Veterans are in outreach / intervention services, which Veterans have refused service, etc. PR-1380 1.1.25
  
  @Veteran_Outreach_StatusPR_1380
Scenario: I open a web browser and use http://localhost:7003/ to see the Veteran's Outreach Status in veteran roaster widget
  Given I navigate to the http://localhost:7003/
  Then I should see "Perceptive Reach"
  Then I put in "email" field as "TESTER252"
  Then I put in "password" field as "M2n#f5s4f7"
  And I click on check box "checky"
  And I click on "Login" button
  And I click on "Individual View"
  Then I should see the "Patient Roster by VAMC" widget
  And I should see "Outreach Status" column
  And I click on "Logout" button