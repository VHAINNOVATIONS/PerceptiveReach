Feature: As a Dashboard User, I want to view a Veteran's medications from within the Dashboard so I can view the Veteran's prescriptions at a glance and make outreach and care decisions. @PR-1405 1.1.26

@view_medicationswidget_PR-1405

Scenario: I open a web browser and see the Veteran's medication widget
Given I navigate to the http://localhost:7003/
Then I should see "Perceptive Reach"
Then I put in "email" field as "vaphsfequia"
Then I put in "password" field as "FeAn#011819"
And I click on check box "checky"
And I click on "Login" button
When I click on "Individual View"
And I click the Add a Widget button
And I add the "medication" widget
Then I should see the "Medication" widget
And I should see "Amoxicillin"
And I should see "Dosage"
And I should see "Active Orders"
And I should see "Inactive Orders"
And I click on "Logout" button

@click_btw_appts_PR-1405

Scenario: When I am at the Veteran's medication widget I should be able to click between active and inactive orders, and I should be able to see both displayed at the same time.

Given I navigate to the http://localhost:7003/
Then I should see "Perceptive Reach"
Then I put in "email" field as "vaphsfequia"
Then I put in "password" field as "FeAn#011819"
And I click on check box "checky"
And I click on "Login" button
When I click on "Individual View"
Then I should see the "Medication" widget
When I click on "Active Orders"
Then I should see "Active Orders"
When I click on "Inactive Orders"
Then I should see "Inactive Orders" 
When I check "active" and "inactive" orders
Then I should see "active and inactive orders"
And I click on "Logout" button


