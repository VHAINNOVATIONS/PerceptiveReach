Feature: As a system administrator, I want the capability to have up to 3 active instances of the application running at once PR-2083

Scenario: I open a web browser and navigate to http://localhost:7003/ to check the 3 active instances
Given I navigate to the http://localhost:7003/
Then I should see "Perceptive Reach"
When I put in "email" field as "TESTER191"
And I put in "password" field as "FeAn#011819"
And I click on check box "checky"
And I click on "Login" button
And I click on "Individual View"
When I open a browser and navigate to http://localhost:7003 for another session with username "TESTER191" and password "FeAn#011819"
When  I open a browser and navigate to http://localhost:7003 for another session with username "TESTER191" and password "FeAn#011819"
When  I open a browser and navigate to http://localhost:7003 for last session with username "TESTER191" and password "FeAn#011819"