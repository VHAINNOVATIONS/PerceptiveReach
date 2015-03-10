Feature: As a Dashboard User, I want to view a Veteran's cover sheet information (as in the CPRS cover sheet) from within the Dashboard so I can view the Veteran's recent care at a glance and make outreach decisions. - PR-1154

Scenario: I open a web browser and see the Individual Veteran View and the Veteran's cover sheet information
Given I navigate to the http://localhost:7003/
When I click on "Individual View"
Then I should see the "Veteran's cover sheet Information" widget
And I should see "medications"
And I should see "appointments"
And I should see "problems"
And I should see "flags"
Then I should be able to toggle categories of data or or off