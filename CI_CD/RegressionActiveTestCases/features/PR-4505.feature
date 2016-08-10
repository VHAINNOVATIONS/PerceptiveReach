Feature: As an IRDS Dashboard user, I would like to be able to see community resources on the Individual view so I can recommend them to a Veteran. PR-4505 1.1.11
@Add_Community_Resources_PR_4505
Scenario: PR-4505
Given I navigate to the http://localhost:7003/
Then I should see "Perceptive Reach"
Then I put in "email" field as "TESTER261"
Then I put in "password" field as "FeAn#011819"
And I click on check box "checky"
And I click on "Login" button
When I click on "Individual View"
Then I click on the Default Widgets button
Then I should see the "Community Resource" widget
And I should see "Name" column
And I should see "Address" column
And I should see "Phone" column
And I should see "Website" column
And I click on "Logout" button