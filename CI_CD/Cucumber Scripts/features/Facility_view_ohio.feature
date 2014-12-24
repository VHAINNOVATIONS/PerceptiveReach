Feature: As a SPC I want to see the Facility View for the Perceptive Reach Dashboard
<<<<<<< HEAD

@Ohio
Scenario: I open a web browser and use http://localhost:9000/ to see at facility View Ohio

	Given I am on http://localhost:9000/
=======
#Ohio Feature
@Ohio
Scenario: I open a web browser and use http://localhost:7001/ to see at facility View Ohio

	Given I am on http://localhost:7001/
>>>>>>> 17f5db02307231da2da35d9bc153dd3462fef330
	When I click on OHIO
	Then I should see the "State Facility View - OH"
	When I select on VAMCID "9"
And When I click on "Ok" button
	Then I should see the  "VA Medical Center"
	And When I click on Specific Veteran SSN  "000288684"
	Then I should see the Individual Veteran info in detail having "Contact Information"
	
<<<<<<< HEAD
	
	@Arizona
	Scenario: I open a web browser and use http://localhost:9000/ to see at facility View Arizona

	Given I am on http://localhost:9000/
=======
#Arizona feature
	@Arizona 
	Scenario: I open a web browser and use http://localhost:7001/ to see at facility View Arizona

	Given I am on http://localhost:7001/
>>>>>>> 17f5db02307231da2da35d9bc153dd3462fef330
	When I click on Arizona
	Then I should see the "State Facility View - AZ"
	When I select on VAMCID "60"
And When I click on "Ok" button
	Then I should see the  "VA Medical Center"
<<<<<<< HEAD
=======
	
#Widget
	
	@Widget
    Scenario: I open a web browser and use http://localhost:7001/ to see Widgets page

	Given I am on http://localhost:7001/
	When I click on Widgets
	Then I should see the "Supported widgets will be available soon"

  
>>>>>>> 17f5db02307231da2da35d9bc153dd3462fef330
	