Feature: As a Dashboard User, I want to see a widget that allows me to view a menu showing how many Veterans are a certain attribute in the database. PR-878
Given I navigate to the http://localhost:7003/
Then I click on the drop down for widgets 
Then I select "Veteran Attributes" widget
Then I click save
And I should see the widget "Veteran Attributes" 