Feature: As a Dashboard User, I want to see a circle chart that shows what percentage of suicides were completed with a specific means. For example, firearms vs. strangulation vs. poisoning vs. all others. PR-879 1.1.14

Scenario:PR-879

Given I navigate to the http://localhost:7003/
Then I should see "Perceptive Reach Login"
Then I put in "Username" field as "vaphsfequia"
Then I put in "password" field as "FeAn#011819"
And I click on "Login" button
When I click on "Add a Widget" button
And I add the "Means Completion Chart" widget
And I click "save changes" button
Then I should see "Means Completion Chart" widget
And I click on "Logout" button