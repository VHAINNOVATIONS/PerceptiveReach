Feature: As an Outreach Provider, I want to view a Direct Message when a Veteran experiences a high risk trigger or event, so I can provide outreach services to them. - PR-505

Scenario: I open a web browser and see the SPC page and a notification of a Direct Message
Given I navigate to the http://localhost:7003/
When I click on "Notifications" button
Then I should see high risk veteran notification
And I click on high risk veteran notification
Then I should see the direct message which highlights high risk trigger or event
And I click on notification for high risk veteran due to a trigger or event
Then I should see details of high risk veteran 