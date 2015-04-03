Feature: As a Dashboard User, I want to view a Veteran's Patient Risk Flags (PRF) from within the Dashboard so I can view the Veteran's prescriptions at a glance and make outreach and care decisions. @PR-1406


@view_patientriskflags_PR-1406

Scenario: I open a web browser and see the patient risk flags widget
Given I navigate to the http://localhost:7003/
When I click on Individual View
Then I should see the "Patient Flags" widget
And I should see "Flags"
And I should see "Cat"

@click_btwactive_inactive_PR-1406

Scenario: When I am at the Patient Risk Flags widget I should be able to click between active and inactive flags, Class I and Class II flags and also to be able to all at the same time
When I click on Individual View
Then I should see the "Patient Flags" widget
Then I should be able to click on "Active Flags"
And I should be able to see all "Active Flags"
Then I should be able to click on "Inactive Flags"
And I should be able to see all "Inactive Flags"
Then I should be able to click on "Class I Flags"
And I should be able to see "Class I Flags"
Then I should be able to click on "Class II Flags"
And I should be able to see "Class II Flags"
Then I should be able to click on "Patient Risk Flags"
And I should be able to see all "Active Flags","Inactive Flags", "Class I Flags" and "Class II Flags"