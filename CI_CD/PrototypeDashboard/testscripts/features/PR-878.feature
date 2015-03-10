Feature: As a Dashboard User, I want to see a widget that allows me to view a menu showing how many Veterans are a certain attribute in the database. PR-878
Given I navigate to the http://localhost:7003/
When I click on "Add a Widget" button
And I add the "Veteran Attributes" widget
And I click "save changes" button
Then I should see "Veteran Attributes" widget