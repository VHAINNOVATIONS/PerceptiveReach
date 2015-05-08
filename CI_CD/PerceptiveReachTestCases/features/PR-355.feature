Feature: As an Dashboard User, I want to view information related to the change in suicide rates over time. PR-355 1.1.6

Scenario: PR-355
Given I navigate to the http://localhost:7003/
Then I should see "Perceptive Reach Login"
Then I put in "email" field as "vaphsfequia"
Then I put in "password" field as "FeAn#011819"
And I click on "Login" button
When I click on "Facility View"
Then I add the "Suicide Rate" widget
And I should see the "Suicide Rate" widget
When I click on "State View"
Then I add the "Suicide Rate" widget
And I should see the "Suicide Rate" widget
When I click on "VISN View"
Then I add the "Suicide Rate" widget
And I should see the "Suicide Rate" widget
When I click on "National View"
Then I add the "Suicide Rate" widget
And I should see the "Suicide Rate" widget
And I click on "Logout" button
