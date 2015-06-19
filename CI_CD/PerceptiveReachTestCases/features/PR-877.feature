Feature: As a Dashboard User, I want to see a widget that allows me to view a menu showing how many Veterans are within a certain risk stratification. PR-877 1.1.12
Scenario: PR-877
Given I navigate to the http://localhost:7003/
Then I should see "Perceptive Reach"
Then I put in "email" field as "vaphsfequia"
Then I put in "password" field as "FeAn#011819"
And I click on check box "checky"
And I click on "Login" button
When I click on "Add a Widget" button
And I add the "Current High Risk Veterans" widget
And I click "save changes" button
Then I should see "Current High Risk Veterans" widget
And I click on "Logout" button