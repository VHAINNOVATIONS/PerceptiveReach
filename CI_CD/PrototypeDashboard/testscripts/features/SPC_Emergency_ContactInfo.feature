Feature: As a Dashboard user, I want to see a Veteran's emergency contact information so that I can contact them to provide outreach and intervention services. 

@Close_Widget_PR-1268
Scenario: I open a web browser and use http://localhost:7003/ to delete/close the Emergency Contact Information widget.
  Given I navigate to the http://localhost:7003/
  When I click on "Individual View" 
  Then I should see "Veteran Roster by VAMC" widget
  When I click on "Jon Doe"
  Then I should see "Emergency Contact Information" widget
  When I click on close on the "Emergency Contact Information" widget
  	And I click on "save changes" button
  Then I should not see the "Emergency Contact Information" widget
 
@Detail_PR-1268
  Scenario: I open a web browser and use http://localhost:7003/ to see the Veteran's contact information of emergency contact address, emergency contact number, emergency contact alternate number,City, State and Zip code, and emergency contact relationship
  Given I navigate to the http://localhost:7003/
  When I click on "Individual View" 
  Then I should see "Veteran Roster by VAMC" widget
  When I click on "Jon Doe"
  Then I should see "Emergency Contact Information" widget
  And I should see Relationship "Sister" in emergency contact information
  And I should see Phone in emergency contact information
  And I should see Alternate Phone in emergency contact information
  And I should see Address in emergency contact information
  And I should see City in emergency contact information
  And I should see State in emergency contact information
  And I should see Zip code in emergency contact information

 @Drag_Widget_PR-1268
Scenario: I open a web browser and use http://localhost:7003/ to drag the Emergency Contact Information widget.
  Given I navigate to the http://localhost:7003/
  When I click on "Individual View" 
  Then I should see "Veteran Roster by VAMC" widget
  When I click on "Jon Doe"
  Then I should see "Emergency Contact Information" widget
  When I click on the top bar of the "Emergency Contact Information" widget
  Then I should be able to drag the "Emergency Contact Information" widget to anywhere on the page

 @Info_PR-1268
Scenario: I open a web browser and use http://localhost:7003/ to see the Veteran's emergency contact information
  Given I navigate to the http://localhost:7003/
  When I click on "Individual View" 
  Then I should see "Veteran Roster by VAMC" widget
  When I click on "Jon Doe"
  Then I should see "Emergency Contact Information" widget