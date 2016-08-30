Feature: As a Dashboard User, I want to click Default widget multiple times PR-4005

Scenario: I open a web browser and see the Veteran's medication widget
Given I navigate to the http://localhost:7003/
Then I should see "Perceptive Reach"
Then I put in "email" field as "Dashboard_SUP"
Then I put in "password" field as "G4j6k$y0s8"
And I click on check box "checky"
And I click on "Login" button
When I click on "Surveillance View"
And I click on "Default Widgets" button multiple times
And I click on "Logout" button
