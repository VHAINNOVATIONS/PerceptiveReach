Feature: No "X" In the Top Right of Widgets. (Bug PR-3530)
Scenario: PR-3530
Given I navigate to the http://localhost:7003/
Then I should see "Perceptive Reach"
Then I put in "email" field as "Zach_ADM"
Then I put in "password" field as "FeAn#011819"
And I click on check box "checky"
And I click on "Login" button
And I should see "Remove Widget" button
And I click on "Logout" button
