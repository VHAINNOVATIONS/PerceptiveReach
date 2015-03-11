Feature: As a Dashboard User, I want to see a widget that allows me to view a ""roster"" (or list) of Veterans that have been identified by the application as high risk. PR-876
Scenario: PR-876
Given I navigate to the http://localhost:7003/
Then I click on "Add a Widget" button
Then I add the "Veteran Roster by VAMC" widget
Then I click "save changes" button
And I should see "Veteran Roster by VAMC" widget
And I should see "Veteran Name" column
And I should see "Veteran SSN" column
And I should see "Veteran Phone" column
And I should see "Date First identified" column
And I should see "Statistical Risk Level" column
And I should see "Outreach Status" column