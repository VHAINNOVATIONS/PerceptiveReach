Feature: As an Dashboard User, I want to view information related to the change in suicide rates over time. PR-355 1.1.6

Scenario: PR-355
Given I navigate to the http://localhost:7003/
When I click on "Facility View"
Then I add the "Suicide Rate" widget
And I should see the "Suicide Rate" widget
When I click on "State View"
Then I add the "Suicide Rate" widget
And I should see the "Suicide Rate" widget
When I click on "VISN View"
Then I add the "Suicide Rate" widget
And I should see the "Suicide Rate" widget
When I click on "National View"
Then I add the "Suicide Rate" widget
And I should see the "Suicide Rate" widget
