Feature: As a SPC I want customize my widget page
 	
	@EditWidgetPR-1317
    Scenario: I open a web browser and use http://localhost:7003/ to see customize National View Widgets page to edit a widget's title

	Given I navigate to the http://localhost:7003/
	When I click on "Individual View"
	And I click on edit on "Widget 2" widget 
	When I click on  "Individual View"
	And I click on edit on "Widget 1" widget
	And I change the title on pop-up to "Example"
	And I click on "OK" button
	And I click on save button
	Then I should see the widget 1 title change to "Example"
	
		
			
	@DeleteWidgetPR-1317
	
	Scenario: I open a web browser and use http://localhost:7003/ to see customize Widgets page to delete a widget from widgets page
	
	Given I navigate to the http://localhost:7003/
	When I click on "Individual View"
	And I click on close on the "Medication" widget
	And I click on "save changes" button
	Then I should not see the "Medication" widget