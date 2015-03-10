Feature: As a Dashboard User, I want to be presented "Clinical Decision Support" information related to a Veteran's specific information. PR-996

Scenario: PR_996
Given I navigate to the http://localhost:7003/
Then I click on "Individual View"
Then I click on a Veteran's name 
And I should see "Clinical Decision Support" 