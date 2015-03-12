Feature: As a Dashboard User, I want to see a line graph that shows the change in how many Veterans are at the top .1% or 5% of the risk stratification model over time. PR-881
Scenario: 
Given I navigate to the http://localhost:7003/
Then I click on the drop down for widgets 
Then I select "Veterans in Highest .1% Risk Percentile" widget
Then I click save
And I should see the widget "Veterans in Highest .1% Risk Percentile" 