Feature: As an Dashboard User, I want to view information related to the change in suicide rates over time. PR-355

Scenario: PR-355
Given I navigate to the http://localhost:7003/
When I click on "Facility View"
Then I should see the widget "Suicide Rate"
When I click on "State View"
Then I should see the widget "Suicide Rate"
When I click on "VISN View"
Then I should see the widget "Suicide Rate"
When I click on "National View"
Then I should see the widget "Suicide Rate"
And I should see the widget displaying information related to change in suicide
And I should see changes in suicide rates over time periods