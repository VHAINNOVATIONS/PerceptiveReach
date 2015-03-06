Feature: As a Dashboard User, I want to view a Veteran's cover sheet information (as in the CPRS cover sheet) from within the Dashboard so I can view the Veteran's recent care at a glance and make outreach decisions. - PR-1154

Scenario Outline: I open a web browser and see the Individual Veteran View and the Veteran's cover sheet information
Given I navigate to the http://localhost:7003/
When I Click on Individual Veteran View
Then I should see a widget "Veteran's cover sheet Information"
And I should see medications
And I should see appointments
And I should see problems
And I should see flags
Then I should be able to toggle categories of data or or off