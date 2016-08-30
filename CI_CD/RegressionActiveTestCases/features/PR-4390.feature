Feature: VISN and Facility selection gets removed when a widget is removed. PR-4390 1.1.11

Scenario: PR-4390
Given I navigate to the http://localhost:7003/
Then I should see "Perceptive Reach"
Then I put in "email" field as "TESTER4390"
Then I put in "password" field as "FeAn#011819"
And I click on check box "checky"
And I click on "Login" button
When I click on "Surveillance View"
And I select first VISN Roster in the widget
Then I should wait for twenty seconds
And I Select first VAMC facility in facility roster widget
And I click X in upper right of Prediction Chart widget
And I click on "Add a Widget" button
And I add the "PredictionChart" widget
Then I should wait for twenty seconds
Then I should not see "No Data Available" in Prediction Chart
And I click on "Logout" button

