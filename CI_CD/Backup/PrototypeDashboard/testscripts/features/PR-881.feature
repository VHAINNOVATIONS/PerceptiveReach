Feature: As a Dashboard User, I want to see a line graph that shows the change in how many Veterans are at the top .1% or 5% of the risk stratification model over time. PR-881
Scenario: 
Given I navigate to the http://localhost:7003/
Then I click on "Add a Widget" button
Then I add the "Veterans in Highest .1% Risk Percentile" widget
Then I click "save changes" button
And I should see "Veterans in Highest .1% Risk Percentile" widget