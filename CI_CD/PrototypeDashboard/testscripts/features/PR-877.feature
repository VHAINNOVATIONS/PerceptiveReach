Feature: As a Dashboard User, I want to see a widget that allows me to view a menu showing how many Veterans are within a certain risk stratification. PR-877
Scenario: PR-877
Given I navigate to the http://localhost:7003/
Then I click on "Add a Widget" button
Then I add the "Current High Risk Veterans" widget
Then I click "save changes" button
And I should see "Current High Risk Veterans" widget