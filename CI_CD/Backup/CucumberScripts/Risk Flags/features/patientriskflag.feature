Feature: As a Dashboard User, I want to view a Veteran's Patient Risk Flags (PRF) from within the Dashboard so I can view the Veteran's prescriptions at a glance and make outreach and care decisions. @PR-1406

@open_widget_PR-1406
Scenario: I open a web browser and see the SPC Navigation Page 
Given I navigate to the http://localhost:7003/
When I click on "Individual View" 
Then I should see the widget "Veteran's Patient Risk Flags"

@close_widget_PR-1406
Scenario: I open a web browser and to delete/close the "Veteran's Patient Risk Flags" widget.

Given I navigate to the http://localhost:7003/
When I click on "Individual View"
Then I should see the widget "Veteran's Patient Risk Flags"
When I click on close on the "Veteran's Patient Risk Flags" widget
  	And I click on save changes
Then I should not see the widget "Veteran's Patient Risk Flags" widget


@drag_widget_PR-1406
Scenario: I open a web browser and to drag the "Veteran's Patient Risk Flags" widget.

Given I navigate to the http://localhost:7003/
When I click on "Individual View"
Then I should see the widget "Veteran's Patient Risk Flags"
When I click on the top bar of the "Veteran's Patient Risk Flags" widget
  Then I should be able to drag the "Veteran's Patient Risk Flags" widget to anywhere on the page

@detail_widget_PR-1406
Scenario: I open a web browser and see a Veteran's patient risk flags widget, with active flags displayed on the screen, with the ability to toggle among just active flags, just inactive flags, the ability to toggle among just Class I flags, just Class II flags and all flags displayed at the same time.

Given I navigate to the http://localhost:7003/
When I click on "Individual View" 
Then I should see the widget "Veteran's Patient Risk Flags"
And I should see active flags displayed on the screen
And I should see inactive flags displayed on the screen
Then I click on the active flags 
And I just see active flags
Then I click on the inactive flags 
And I see just inactive flags
Then I click on Class I flags 
And I see just Class I flags
Then I click among Class II flags 
And I see just Class II flags 



