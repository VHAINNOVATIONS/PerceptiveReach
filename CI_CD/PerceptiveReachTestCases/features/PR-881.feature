Feature: As a Dashboard User, I want to see a line graph that shows the change in how many Veterans are at the top .1% or 5% of the risk stratification model over time. PR-881 1.1.16
Scenario: 
Given I navigate to the http://localhost:7003/
Then I should see "Perceptive Reach"
Then I put in "email" field as "vaphsfequia"
Then I put in "password" field as "FeAn#011819"
And I click on check box "checky"
And I click on "Login" button
Then I click on "Add a Widget" button
Then I add the "Veterans in Highest .1% Risk Percentile" widget
Then I click "save changes" button
And I should see "Veterans in Highest .1% Risk Percentile" widget
And I click on "Logout" button