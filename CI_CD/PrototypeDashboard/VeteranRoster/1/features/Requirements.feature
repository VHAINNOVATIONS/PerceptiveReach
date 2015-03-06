Feature: As a SPC I  want to view newly identified at-risk Veterans during a specific time frame PR_352
#At-Risk Feature

Scenario Outline: I open a web browser and see the SPC navigation page
Given I navigate to the http://localhost:7003/
Then I should see the navigation menu
And
	When I click on  "State Facility View - OH"
	Then I should see at risk veterans for the state facility OHIO
And When I click on specific time frame
Then I should see the at-risk veterans for the specific time frame
And When I select the previous month 
Then I should see the at-risk veterans for the previous months


Feature: As a SPC Outreach provider I want view the direct message that highlights high risk veterans so that I can 
provide out reach services PR-346

Scenario Outline:  I open a web browser and see the SPC navigation page
Given I navigate to the http://localhost:7003/
When I Click on notifications 
Then I should see high risk veteran notification
And I click on high risk veteran notification
Then I should see the direct message which highlights high risk veterans
And I click on notification for high risk veteran due to a trigger or event
Then I should see details of high risk veteran 

Feature: As a SPC User I want to view information about groups of at-risk Veterans filtered by geographic area PR-353
Scenario Outline: I open a web browser and see the SPC navigation page
Given I navigate to the http://localhost:7003/
When I click on  "State Facility View - OH"
 Then I should see list of facility's for OHIO
And I select the geographical filter 
And I should see the groups of at-risk Veterans filtered by geographic area

Feature: As a SPC User I want to view information about groups of at-risk Veterans filtered by data attributes PR-354

Scenario Outline: I open a web browser and see the SPC navigation page
Given I navigate to the http://localhost:7003/
When I click on  "State Facility View - OH"
 Then I should see list of facility's for OHIO
And I select the data attributes 
And I should see the groups of at-risk Veterans filtered by data attributes

Feature: As a SPC User I want to view a graphic in a widget that allows me to see basic information related to a VA facility PR-882
Scenario Outline: I open a web browser and see the SPC navigation page
Given I navigate to the http://localhost:7003/
When I click on  "State Facility View - OH"
And I click on VA facility VAMC ID 9
Then I should see graphic widget for basic facility information

Feature: As a SPC User  I want to see a widget that allows me to view a "roster" (or list) of Veterans that have been identified by the application as high risk PR-876
Scenario Outline: I open a web browser and see the SPC navigation page
Given I navigate to the http://localhost:7003/
When I click on widgets
Then should see widget with roster of Veterans that have been identified by the application as high risk

Feature: As a SPC Clinician, I want to view a form that lists all of the data elements I can update in a patient's record PR-600
Scenario Outline: I open a web browser and see the SPC navigation page
Given I navigate to the http://localhost:7003/
I login as a Clinician 
Then I should see form that lists all of the data elements I can update in a patient's record


