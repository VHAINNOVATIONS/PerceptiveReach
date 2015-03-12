Feature: As a Dashboard User, I want to see a line graph that shows the change in suicide rate over time. PR-880
Given I navigate to the http://localhost:7003/
Then I click on the drop down for widgets 
Then I select " Suicide Rate" widget
Then I click save
And I should see the widget "Suicide Rate"