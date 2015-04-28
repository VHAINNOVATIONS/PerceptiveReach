Feature: As an Outreach Provider, I want to view a Direct Message when a Veteran experiences a high risk trigger or event, so I can provide outreach services to them. - PR-505 1.1.9

Scenario: I open a web browser and see the SPC page and a notification of a Direct Message
Given I navigate to the http://localhost:7003/
Then I should see "Perceptive Reach Login"
Then I put in "Username" field as "vaphsfequia"
Then I put in "password" field as "FeAn#011819"
And I click on "Login" button
When I click on "Notifications" button
Then I should see high risk veteran notification
And I click on high risk veteran notification
Then I should see the direct message which highlights high risk trigger or event
And I click on notification for high risk veteran due to a trigger or event
Then I should see details of high risk veteran 
And I click on "Logout" button