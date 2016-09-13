Feature: As a Perceptive Reach Dashboard user, I want to see instructions for how to email the help desk on the log in screen before I log in, so I know what to do if I need help.. PR-3731

Scenario: I open a web browser and navigate to http://localhost:7003/ where I can view  Instructions to email Help Desk Dashboard
Given I navigate to the http://localhost:7003/
Then I should see "Perceptive Reach"
Then I should see "If you have any further questions regarding Perceptive Reach and associated resources, Please contact the Help Desk at VAPerceptiveReachSupport@va.gov"
When I put in "email" field as "TESTER254"
And I put in "password" field as "M1n@h3s4f9"
And I click on check box "checky"
And I click on "Login" button
And I click on "Surveillance View"
Then I should see "Contact Help Desk"
And I click on "Logout" button