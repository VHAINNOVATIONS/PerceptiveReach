Feature: As a SPC I want to see a Veteran's contact information so that I can contact
@Contact_information_PR_1267
Scenario: I open a web browser and use http://localhost:7003/ to see the Veteran's contact information
  Given I am on http://localhost:7003/
  When I click on Individual view 
  Then I should see the widget with list of Veterans "Veterans list"
  When I click on Individual veteran "James smith"
  Then I should see veteran contact information "veteran contact information"
  
  @Detail_information_PR_1267
  Scenario: I open a web browser and use http://localhost:7003/ to see the Veteran's contact information of Name, Last 4 of SSN, Phone, Alternate Phone, Address, City, State and Zip code
  
  
  Given I am on http://localhost:7003/
  When I click on Individual view 
  Then I should see the widget with list of Veterans "Veterans list"
  When I click on Individual veteran "Jane smith"
  Then I should see veteran contact information "veteran contact information"
  And I should see  SSN "Last 4 of SSN" in veteran contact information
  And I should see AP "Alternate Phone" in veteran contact information
  And I should see Address "Address" in veteran contact information
  And I should see city "City" in veteran contact information
  And I should see state "State" in veteran contact information
  And I should see zcode "Zip code" in veteran contact information
  