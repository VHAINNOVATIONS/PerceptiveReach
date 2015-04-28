Feature: As a Dashboard User, I want to see a widget that allows me to view a menu showing how many Veterans are a certain attribute in the database. PR-878 1.1.13

Scenario: PR-878
Given I navigate to the http://localhost:7003/
Then I should see "Perceptive Reach Login"
Then I put in "Username" field as "vaphsfequia"
Then I put in "password" field as "FeAn#011819"
And I click on "Login" button
When I click on "Add a Widget" button
Then I add the "Veteran Attributes" widget
And I click "save changes" button
Then I should see "Veteran Attributes" widget
And I click on "Logout" button