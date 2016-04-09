Feature: As a Dashboard User, I want the new Patient ID bar to show the Veteran's Social Security Number in addition to the name when I am on the individual view.PR-2992

Scenario: I open a web browser and navigate to http://localhost:7003/ where I can view Consolidated Surveillance View widgets
Given I navigate to the http://localhost:7003/
Then I should see "Perceptive Reach"
When I put in "email" field as "TESTER260"
And I put in "password" field as "M1n@h3s4f9"
And I click on check box "checky"
And I click on "Login" button
When I click on "Individual View"
Then I select first Veteran
Then I see the same SSN and VeteranID displayed on top of page for first veteran
Then I select Another Veteran
Then I should wait for twenty seconds
Then I see the same SSN and VeteranID displayed on top of page for another veteran
And I click on "Logout" button