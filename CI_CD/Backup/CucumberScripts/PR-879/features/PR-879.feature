Feature: As a Dashboard User, I want to see a circle chart that shows what percentage of suicides were completed with a specific means. For example, firearms vs. strangulation vs. poisoning vs. all others. PR-879

Given I navigate to the http://localhost:7003/
Then I click on the drop down for widgets 
Then I select "Means Completion Chart" widget
Then I click save
And I should see the widget " Means Completion Chart" 