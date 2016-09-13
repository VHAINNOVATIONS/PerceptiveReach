Feature: As a Clinical Care Team Member, I want to view a history of the principal MH providers free text entries by selecting the left or right arrows.PR-3449

Scenario: I open a web browser and navigate to http://localhost:7003/ where I can view Consolidated Surveillance View widgets
Given I navigate to the http://localhost:7003/
Then I should see "Perceptive Reach"
When I put in "email" field as "TESTER261"
And I put in "password" field as "M1n@h3s4f9"
And I click on check box "checky"
And I click on "Login" button
When I click on "Individual View"
Then I click on the Default Widgets button
Then I should see "Data Entry" widget
And I should see "User Notes:" 
And I should see "SPAN Records"
And I should see "VistA Records:" 
And I should see "--No Data Available--"
And I click on "Logout" button