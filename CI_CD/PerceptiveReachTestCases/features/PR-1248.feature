
Feature: As a Dashboard user, I want to view the change in a Veteran's pain level over time so that I can help them manage pain, if needed. See attachment in Jira for a screen capture from a pain management app. @PR-1248 1.1.21
   
@view_painlevel_widget_PR-1248

Scenario: I open a web browser and see the pain level widget 
Given I navigate to the http://localhost:7003/
Then I should see "Perceptive Reach"
Then I put in "email" field as "vaphsfequia"
Then I put in "password" field as "FeAn#011819"
And I click on check box "checky"
And I click on "Login" button
When I click on "Individual View"
Then I should see the "Pain Level" widget
And I click on "Logout" button


