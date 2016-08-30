Feature: As an IRDS Dashboard user, I would like to see Formatting of Free Form Text(bug PR-2718)
Scenario: PR-2718
Given I navigate to the http://localhost:7003/
Then I should see "Perceptive Reach"
Then I put in "email" field as "TESTER261"
Then I put in "password" field as "FeAn#011819"
And I click on check box "checky"
And I click on "Login" button
When I click on "Individual View"
Then I should see the "Patient Roster by VAMC" widget
And I should see "8005559457"
And I click on "Logout" button