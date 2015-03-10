Feature: As a SPC I want to see a Veteran's contact information so that I can contact
@Contact_information_PR_1267
Scenario: I open a web browser and use http://localhost:7003/ to see the Veteran's contact information
  Given I navigate to the http://localhost:7003/
  When I click on "Individual View" 
  Then I should see "Veteran Roster by VAMC" widget
  And I should see Individual veteran "Jane Smith"
  Then I click on "Jane Smith"
  Then I should see "Veteran Contact" widget
  
  @Detail_information_PR_1267
  Scenario: I open a web browser and use http://localhost:7003/ to see the Veteran's contact information of Name, Last 4 of SSN, Phone, Alternate Phone, Address, City, State and Zip code  
  
  Given I navigate to the http://localhost:7003/
  When I click on "Individual View"
  Then I should see "Veteran Roster by VAMC" widget
  Then I click on "Jane Smith"
  Then I should see "Veteran Contact" widget
  And I should see "Veteran SSN" column
  And I should see "Veteran Phone" column
  And I should see "Address" column
  And I should see "City" column
  And I should see "State" column
  And I should see "Zip Code" column
  
  