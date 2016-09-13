Feature: Adding the Same Widget Multiple Times (Bug PR-3002)

Scenario: I open a web browser and navigate to http://localhost:7003/ where I can view Widget
Given I navigate to the http://localhost:7003/
Then I should see "Perceptive Reach"
When I put in "email" field as "TESTER260"
And I put in "password" field as "*********"
And I click on check box "checky"
And I click on "Login" button
When I click on "Individual View"
And I click on "Add a Widget" button
And I click on "enterdata" button in the menu
Then I should see "This widget has already been added to your dashboard. Please select a different widget to add."
And I click on "Logout" button

