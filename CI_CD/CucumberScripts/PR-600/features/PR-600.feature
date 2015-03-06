Feature: As a SPC Clinician, I want to view a form that lists all of the data elements I can update in a patient's record PR-600
Scenario: I open a web browser and see the SPC navigation page
Given I navigate to the http://localhost:7003/
I login as a Clinician 
Then I should see form that lists all of the data elements I can update in a patient's record
