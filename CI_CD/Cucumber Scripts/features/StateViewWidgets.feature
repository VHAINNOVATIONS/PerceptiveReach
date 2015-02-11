Feature: Navigate and clear the widgets in the State View

@StateViewWidgetsPR-1191

Scenario: I open the State View and navigate the widgets

Given I navigate to the "http://localhost:7003"		
When the webpage loads 
Then I expect to see the widgets in the State View
And I click Default Widget
	Then I see the default widgets 
And I click Clear
	Then I expect to see all widgets have been cleared
And I click save changes
	Then I expect to see the Widgets in the order I placed them
		
