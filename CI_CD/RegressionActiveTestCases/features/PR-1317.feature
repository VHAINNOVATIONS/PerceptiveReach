Feature: As a SPC I want customize my widget page PR-1317 1.1.24
 	
	@EditWidgetPR-1317
    Scenario: I open a web browser and use http://localhost:7003/ to see customize National View Widgets page to edit a widget's title

	Given I navigate to the http://localhost:7003/
	Then I should see "Perceptive Reach"
    Then I put in "email" field as "TESTER140"
    Then I put in "password" field as "FeAn#011819"
	And I click on check box "checky"
    And I click on "Login" button
	When I click on "Individual View"
	And I click on edit on the "Medication" widget
	And I change the title to "Prescriptions" on the pop-up
	And I click on "OK" button
	And I click on "save changes" button
	Then I should see the "Prescriptions" widget
	And I click on "Logout" button

	
		
			
	@DeleteWidgetPR-1317
	
	Scenario: I open a web browser and use http://localhost:7003/ to see customize Widgets page to delete a widget from widgets page
	
	Given I navigate to the http://localhost:7003/
	Then I should see "Perceptive Reach"
    Then I put in "email" field as "TESTER140"
    Then I put in "password" field as "FeAn#011819"
	And I click on check box "checky"
    And I click on "Login" button
	When I click on "Individual View"
	And I click on close on the "Prescriptions" widget
	And I click on "save changes" button
	Then I should not see the "Prescriptions" widget
	And I click on "Add a Widget" button
    And I click on "medication" button in the menu
    And I click on save changes button
    Then I should see the "medication" widget
	And I click on "Logout" button