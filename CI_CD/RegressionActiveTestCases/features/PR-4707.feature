Feature: As a Dashboard user, I want to view a widget that shows a summary of how many patients have had various items in the Outreach checklist completed PR-4707.

Scenario: PR-4707
Given I navigate to the http://localhost:7003/
Then I should see "Perceptive Reach"
Then I put in "email" field as "Zach_ADM"
Then I put in "password" field as "FeAn#011819"
And I click on check box "checky"
And I click on "Login" button
When I click on "Surveillance View"
Then I should see "Outreach Status Data" widget
And I should see "Outreach Status" column
And I should see "Total Complete" column
And I should see "Percent Complete" column
And I click on "Logout" button