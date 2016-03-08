Feature: As a Dashboard user, I want to see the date and time the last time the data in the Dashboard was refreshed, so I can understand how recent the data is. PR-2617

Scenario: I open a web browser and navigate to http://localhost:7003/ where I can view  Date Time Indicator on the Dashboard
Given I navigate to the http://localhost:7003/
Then I should see "Perceptive Reach"
When I put in "email" field as "TESTER254"
And I put in "password" field as "M1n@h3s4f9"
And I click on check box "checky"
And I click on "Login" button
And I click on "Surveillance View"
Then I should see "Data Last Updated: "
And I click on "Logout" button