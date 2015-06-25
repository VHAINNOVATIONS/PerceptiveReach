Feature: As a system administrator, I want the application to reject any login attempts by non-system administrator users who already have an active session open PR-2082

Scenario: I open a web browser and navigate to http://localhost:7003/ to see the maximum number of a active sessions for standard user
Given I navigate to the http://localhost:7003/
Then I should see "Perceptive Reach"
When I put in "email" field as "perceptiveSUP"
And I put in "password" field as "FeAn#011819"
And I click on check box "checky"
And I click on "Login" button
And I click on "Individual View"
When  I open a browser and navigate to http://localhost:7003 for last session with username "perceptiveSUP" and password "FeAn#011819"
And I click on "Logout" button