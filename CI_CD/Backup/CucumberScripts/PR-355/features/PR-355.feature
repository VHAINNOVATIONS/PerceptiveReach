Feature: As an Dashboard User, I want to view information related to the change in suicide rates over time. PR-355

Scenario: Given I navigate to the http://localhost:7003/
When I go to the Facility, State, VISN and National View
Then I should see the widget "Suicide Rate"
And I should see the widget displaying information related to change in suicide
And I should see changes in suicide rates over time periods