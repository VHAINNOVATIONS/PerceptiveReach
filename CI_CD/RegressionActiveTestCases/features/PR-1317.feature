Feature: As a SPC I want customize my widget page PR-1317 1.1.24
 	
		
	@DeleteWidgetPR-1317
	
	Scenario: I open a web browser and use http://localhost:7003/ to see customize Widgets page to delete a widget from widgets page
	
	Given I navigate to the http://localhost:7003/
	Then I should see "Perceptive Reach"
    Then I put in "email" field as "TESTER_1317"
    Then I put in "password" field as "FeAn#011819"
	And I click on check box "checky"
    And I click on "Login" button
	When I click on "Individual View"
	Then I click on the Default Widgets button
	And I click on close on the "Medication" widget
	Then I should not see the "Medication" widget
	And I click on "Add a Widget" button
    And I click on "medication" button in the menu
    Then I should see the "Medication" widget
	And I click on "Logout" button