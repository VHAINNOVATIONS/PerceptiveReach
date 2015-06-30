Feature: As a Dashboard user, I want to view information from Healthindicators.gov on the Dashboard so that I can view and understand public health / epidemiological data PR-2189

Scenario: I open a web browser and navigate to http://localhost:7003/ where I can view information from Healthindicators.gov on the Dashboard
Given I navigate to the http://localhost:7003/
Then I should see "Perceptive Reach"
When I put in "email" field as "vaphsfequia"
And I put in "password" field as "FeAn#011819"
And I click on check box "checky"
And I click on "Login" button
And I click on "Individual View"
Then I should see "Suicide Indicators" widget
And I should see "Age Range"
And I should see "Gender"
And I should see "Total"
And I should see "Ethnicity"
And I should see "Veteran Status"
And I click on "Logout" button