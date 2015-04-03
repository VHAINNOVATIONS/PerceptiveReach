Feature: As a Dashboard User, I want to see a widget that allows me to view a menu showing how many Veterans are within a certain risk stratification. PR-877 1.1.12
Scenario: PR-877
Given I navigate to the http://localhost:7003/
When I click on "Add a Widget" button
And I add the "Current High Risk Veterans" widget
And I click "save changes" button
Then I should see "Current High Risk Veterans" widget