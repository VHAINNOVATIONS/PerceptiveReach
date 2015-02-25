Feature: As a Dashboard user, I want to see a Veteran's emergency contact information so that I can contact them to provide outreach and intervention services. 
@PR-1268

  Scenario: I open a web browser and use http://localhost:7003/ to see the Veteran's contact information of emergency contact address, emergency contact number, emergency contact alternate number,City, State and Zip code, and emergency contact relationship
  Given I am on http://localhost:7003/
  When I click on Individual view 
  Then I should see the widget with list of Veterans
  When I click on individual Veteran
  Then I see Veteran emergency contact information "Emergency Contact Information"
  And I should see Relationship "Sister" in emergency contact information
  And I should see Phone in emergency contact information
  And I should see Alternate Phone in emergency contact information
  And I should see Address in emergency contact information
  And I should see City in emergency contact information
  And I should see State in emergency contact information
  And I should see Zip code in emergency contact information