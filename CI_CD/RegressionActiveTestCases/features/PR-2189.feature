Feature: As a Dashboard user, I want to view information from Healthindicators.gov on the Dashboard so that I can view and understand public health / epidemiological data PR-2189

Scenario: I open a web browser and navigate to http://localhost:7003/ where I can view information from Healthindicators.gov on the Dashboard
Given I navigate to the http://localhost:7003/
Then I should see "Perceptive Reach"
When I put in "email" field as "TESTER251"
And I put in "password" field as "M1n@h3s4f9"
And I click on check box "checky"
And I click on "Login" button
And I click on "Surveillance View"
Then I should see "External Data HealthIndicators.gov Suicide Statistics" widget
And I should see "Age Range"
And I should see "Gender"
And I should see " 2013 Total Suicide Deaths Per 100K"
And I click on "Logout" button