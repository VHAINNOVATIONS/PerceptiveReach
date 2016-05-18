Feature: User Log In Fail. PR-1677

Scenario: I open a web browser and navigate to http://localhost:7003/ where I get an error message with invalid Login
Given I navigate to the http://localhost:7003/
Then I should see "Perceptive Reach"
Then I should see "If you have any further questions regarding Perceptive Reach and associated resources, Please contact the Help Desk at VAPerceptiveReachSupport@va.gov"
When I put in "email" field as "TESTR254"
And I put in "password" field as "M1n@h3s4f9"
And I click on check box "checky"
And I click on "Login" button
Then I should see "User not registered/Invalid user name"