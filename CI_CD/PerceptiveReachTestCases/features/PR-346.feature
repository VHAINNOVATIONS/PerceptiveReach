Feature: As a SPC Outreach provider I want view the direct message that highlights high risk veterans so that I can provide out reach services PR-346 1.1.1

Scenario:  I open a web browser and see the SPC navigation page
Given I navigate to the http://localhost:7003/
Then I should see "Perceptive Reach Login"
Then I put in "Username" field as "vaphsfequia"
Then I put in "password" field as "FeAn#011819"
And I click on "Login" button
When I click on "Notifications"
Then I should see high risk veteran notification
And I click on high risk veteran notification
Then I should see the direct message which highlights high risk veterans
And I click on notification for high risk veteran due to a trigger or event
Then I should see details of high risk veteran 
And I click on "Logout" button