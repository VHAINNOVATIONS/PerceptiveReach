Feature: As a Dashboard User, I want to see a widget that allows me to view a ""roster"" (or list) of Veterans that have been identified by the application as high risk. PR-876
Given I navigate to the http://localhost:7003/
Then I click on the drop down for widgets 
Then I select "Veteran Roster" widget
Then I click save
And I should see the widget "Veteran Roster Widget"