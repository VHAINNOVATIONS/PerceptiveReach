Feature: As a Dashboard user, I want to see a Veteran's emergency contact information so that I can contact them to provide outreach and intervention services. PR-1268 1.1.23

 
@Detail_PR-1268
  Scenario: I open a web browser and use http://localhost:7003/ to see the Veteran's contact information of emergency contact address, emergency contact number, emergency contact alternate number,City, State and Zip code, and emergency contact relationship
  Given I navigate to the http://localhost:7003/
  Then I should see "Perceptive Reach"
  Then I put in "email" field as "Dashboard_ADM"
  Then I put in "password" field as "FeAn#011819"
  And I click on check box "checky"
  And I click on "Login" button
  When I click on "Individual View" 
  Then I should wait
  Then I should see "Patient Roster by VAMC" widget
  Then I should see "Emergency Contact Information" widget
  And I should see "Name"
  And I should see "Phone"
  And I should see "Alternate Phone"
  And I should see "Address"
  And I should see "City"
  And I should see "State"
  And I should see "Zip Code"
  And I click on "Logout" button
 

 
  @Close_Widget_PR-1268
Scenario: I open a web browser and use http://localhost:7003/ to delete/close the Emergency Contact Information widget.
  Given I navigate to the http://localhost:7003/
  Then I should see "Perceptive Reach"
  Then I put in "email" field as "Dashboard_ADM"
  Then I put in "password" field as "FeAn#011819"
  And I click on check box "checky"
  And I click on "Login" button
  When I click on "Individual View" 
  Then I click on the Default Widgets button
  Then I should see "Patient Roster by VAMC" widget
  Then I should see "Emergency Contact Information" widget
  When I click on close on the "Emergency Contact Information" widget
  Then I should not see the "Emergency Contact Information" widget
  And I click on "Add a Widget" button
  And I click on "emergency" button in the menu
  Then I should see the "Emergency Contact Information" widget
  And I click on "Logout" button