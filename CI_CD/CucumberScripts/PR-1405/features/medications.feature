Feature: As a Dashboard User, I want to view a Veteran's medications from within the Dashboard so I can view the Veteran's prescriptions at a glance and make outreach and care decisions. @PR-1405

@view_medicationswidget_PR-1405

Scenario: I open a web browser and see the Veteran's medication widget
Given I navigate to the http://localhost:7003/
When I click on Individual View
Then I should see the "Veteran's Medication" widget
And I should also see "Name of Medication"
And I should also see "Dosage"
And I should also see " Active Orders"
An I should also see "Inactive Orders"

@click_btw_appts_PR-1405

Scenario: When I am at the Veteran's medication widget I should be able to click between active and inactive orders, and I should be able to see both displayed at the same time.

Given I navigate to the http://localhost:7003/
When I click on Individual View
Then I should see the "Veteran's Medication" widget
Then I should be able to click on "Medication Orders"
And I should be able to see "Active Orders" and "Inactive Orders"
Then I should be able to click on "Active Orders"
And I should be able to see all "Active Orders"
Then I should be able to click on "Inactive Orders"
And I should be able to see all "Inactive Orders"


