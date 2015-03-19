
Feature: As a Dashboard user, I want to view the change in a Veteran's pain level over time so that I can help them manage pain, if needed. See attachment in Jira for a screen capture from a pain management app. @PR-1248
   
@view_painlevel_widget_PR-1248

Scenario: I open a web browser and see the pain level widget 
Given I navigate to the http://localhost:7003/
When I click on "Individual View"
Then I should see the "Pain Level" widget

