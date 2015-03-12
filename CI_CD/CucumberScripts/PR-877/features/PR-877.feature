Feature: As a Dashboard User, I want to see a widget that allows me to view a menu showing how many Veterans are within a certain risk stratification. PR-877
Given I navigate to the http://localhost:7003/
Then I click on the drop down for widgets 
Then I select "Current High Risk Veterans" widget
Then I click save
And I should see the widget "Current High Risk Veterans" 