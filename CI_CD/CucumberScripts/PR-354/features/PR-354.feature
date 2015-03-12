Feature: As a SPC User I want to view information about groups of at-risk Veterans filtered by data attributes PR-354

Scenario: I open a web browser and see the SPC navigation page
Given I navigate to the http://localhost:7003/
When I click on  "State Facility View - OH"
 Then I should see list of facility's for OHIO
And I select the data attributes 
And I should see the groups of at-risk Veterans filtered by data attributes
